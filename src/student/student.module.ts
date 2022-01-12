import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityModule } from 'src/university/university.module';
import { UniversityService } from 'src/university/university.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.schema';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    UniversityModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
