export class Student {
  studentId: number;
  universityId: number;
  name: string;
  grades: CourseGrade[];
  gpa: number;
}

class CourseGrade {
  courseName: string;
  grade: number;
}
