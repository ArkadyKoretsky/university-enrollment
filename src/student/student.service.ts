import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityService } from 'src/university/university.service';
import { CreateStudentDto } from './create-student.dto';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService implements OnModuleInit {
  private totalNumberOfStudents: number; // check if the collection is empty on startup

  // university service for student enrollment
  // to get university by id
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    private universityService: UniversityService,
  ) {}

  // to check only once if the collection is empty
  // and not each time when creating new student
  async onModuleInit(): Promise<void> {
    this.totalNumberOfStudents = await this.studentModel
      .countDocuments()
      .exec();
  }

  // create new student in db and calculate his/hers gpa
  // by given array
  async createStudent(createStudentDto: CreateStudentDto): Promise<number> {
    // find the greatest id (last student added) if the collection is not empty
    if (this.totalNumberOfStudents > 0) {
      const studentWithGreatestId = await this.studentModel
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .exec();
    }
    this.totalNumberOfStudents++;
    createStudentDto._id = this.totalNumberOfStudents;
    createStudentDto.universityId = null;
    createStudentDto.gpa =
      createStudentDto.grades.reduce(
        (sumOfGrades, currentCourse) => sumOfGrades + currentCourse['grade'],
        0,
      ) / createStudentDto.grades.length;
    const createdStudent = new this.studentModel(createStudentDto);
    await createdStudent.save();
    return createStudentDto._id;
  }

  // enroll student to university (by given id)
  // if he/she meets the university conditions (min gpa and max capacity does'nt reached)
  async enrollStudent(
    studentId: number,
    universityId: number,
  ): Promise<string> {
    const university = await this.universityService.getUniversity(universityId);
    if (university === null || university === undefined)
      return 'There is no such university! Please create it first!';

    const student = await this.findStudentById(studentId);
    if (student === null || student === undefined)
      return 'There is no such student! Please create him/her first!';

    if (student.universityId !== null)
      return 'Sorry! But this student already belongs to other university!';

    // the greater than condition doesn't suppose to happen through regular
    // requests, it's only in case someone messed up the data base
    if (university.currentNumberOfStudents >= university.maxNumberOfStudents)
      return 'Sorry! The university is full! Better luck next semester!';
    if (student.gpa < university.minGpa)
      return 'Sorry! The current student does not acquire the minimum GPA needed!';
    else {
      await this.studentModel.findByIdAndUpdate(studentId, {
        universityId: universityId,
      });
      await this.universityService.updateCurrentCapacity(universityId);
      return `Congratulations! The student ${student.name} was excepted to ${university.name}!`;
    }
  }

  // return all students that belong to specific university (by give id)
  async getStudents(universityId: number): Promise<Student[]> {
    return this.studentModel.find({ universityId: universityId }).exec();
  }

  // find specific student by id
  async findStudentById(studentId: number): Promise<Student> {
    return this.studentModel.findById(studentId).exec();
  }
}
