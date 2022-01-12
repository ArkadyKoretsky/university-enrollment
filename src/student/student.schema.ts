import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CourseGrade } from './course-grade.class';

export type StudentDocument = Student & Document;

@Schema({ versionKey: false })
export class Student {
  @Prop()
  _id: number;

  @Prop()
  universityId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  grades: CourseGrade[];

  @Prop()
  gpa: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
