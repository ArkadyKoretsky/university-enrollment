import { Injectable } from '@nestjs/common';
import { CreateUniversityDto } from 'src/university/create-university.dto';
import { UniversityService } from 'src/university/university.service';
import { CreateStudentDto } from './create-student.dto';

@Injectable()
export class StudentService {
  // university service for student enrollment
  // to get university by id
  constructor(private universityService: UniversityService) {}

  private readonly students: CreateStudentDto[] = [
    {
      studentId: 1,
      universityId: 1,
      name: 'James Bond',
      grades: [
        { courseName: 'Angular', grade: 100 },
        { courseName: 'NestJS', grade: 100 },
      ],
      gpa: 100,
    },
    {
      studentId: 2,
      universityId: 3,
      name: 'Tony Stark',
      grades: [
        { courseName: 'React', grade: 98 },
        { courseName: 'ExpressJS', grade: 99 },
      ],
      gpa: 98.5,
    },
  ];

  // create new student in db and calculate his/hers gpa
  // by given array
  createStudent(createStudentDto: CreateStudentDto): number {
    createStudentDto.studentId = this.students.length + 1;
    createStudentDto.universityId = null;
    createStudentDto.gpa =
      createStudentDto.grades.reduce(
        (sumOfGrades, currentCourse) => sumOfGrades + currentCourse['grade'],
        0,
      ) / createStudentDto.grades.length;
    this.students.push(createStudentDto);
    return this.students[this.students.length - 1].studentId;
  }

  // enroll student to university (by given id)
  // if he/she meets the university conditions (min gpa and max capacity does'nt reached)
  enrollStudent(studentId: number, universityId: number): string {
    const university: CreateUniversityDto =
      this.universityService.getUniversity(universityId);
    if (university === null || university === undefined)
      return 'There is no such university! Please create it first!';

    const student: CreateStudentDto = this.students[studentId - 1];
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
      student.universityId = university.id;
      this.students[studentId - 1] = student;
      this.universityService.updateCurrentCapacity(universityId);
      return `Congratulations! The student ${student.name} was excepted to ${university.name}!`;
    }
  }

  // return all students that belong to specific university (by give id)
  getStudents(universityId: number): CreateStudentDto[] {
    return this.students.filter(
      (student) => student.universityId == universityId,
    );
  }
}
