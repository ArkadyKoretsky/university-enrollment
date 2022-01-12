import { CourseGrade } from './course-grade.class';

export class CreateStudentDto {
  _id: number;
  universityId: number;
  name: string;
  grades: CourseGrade[];
  gpa: number;
}
