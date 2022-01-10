import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversityController } from './university/university.controller';
import { StudentController } from './student/student.controller';
import { UniversityService } from './university/university.service';
import { StudentService } from './student/student.service';
@Module({
  imports: [],
  controllers: [AppController, UniversityController, StudentController],
  providers: [AppService, UniversityService, StudentService],
})
export class AppModule {}
