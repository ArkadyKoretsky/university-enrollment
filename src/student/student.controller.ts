import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStudentDto } from './create-student.dto';
import { StudentService } from './student.service';

@Controller()
export class StudentController {
  constructor(private studentService: StudentService) {}

  // creates new student
  @Post('student')
  createStudent(@Body() createStudentDto: CreateStudentDto): number {
    return this.studentService.createStudent(createStudentDto);
  }

  // get list of students of specific university (by given id)
  @Get('students/:universityId')
  getStudents(@Param('universityId') universityId: number): CreateStudentDto[] {
    return this.studentService.getStudents(universityId);
  }

  // enroll student to university under specific conditions
  @Post('enroll/:studentId/:universityId')
  enrollStudent(
    @Param('studentId') studentId: number,
    @Param('universityId') universityId: number,
  ): string {
    return this.studentService.enrollStudent(studentId, universityId);
  }
}
