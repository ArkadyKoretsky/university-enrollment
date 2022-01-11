import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UniversityDocument = University & Document;

@Schema()
export class University {
  @Prop()
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  maxNumberOfStudents: number;

  @Prop()
  currentNumberOfStudents: number;

  @Prop({ required: true })
  minGpa: number;
}

export const UniversitySchema = SchemaFactory.createForClass(University);
