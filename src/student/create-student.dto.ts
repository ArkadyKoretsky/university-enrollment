import { CourseGrade } from './course-grade.class';

export class CreateStudentDto {
  studentId: number;
  universityId: number;
  name: string;
  grades: CourseGrade[];
  gpa: number;
}
