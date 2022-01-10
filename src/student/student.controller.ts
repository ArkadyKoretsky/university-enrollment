import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Student } from './student.dto';
import { StudentService } from './student.service';

@Controller()
export class StudentController {
  constructor(private studentService: StudentService) {}

  // creates new student
  @Post('student')
  createStudent(@Body() student: Student): number {
    return this.studentService.createStudent(student);
  }

  // get list of students of specific university (by given id)
  @Get('students/:universityId')
  getStudents(@Param('universityId') id: number): Student[] {
    return this.studentService.getStudents(id);
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
