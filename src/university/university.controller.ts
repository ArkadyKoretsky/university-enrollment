import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { University } from './university.dto';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  // get university data by given id
  @Get(':id')
  getUniversity(@Param('id') id: number): University {
    return this.universityService.getUniversity(id);
  }

  // create new university
  @Post()
  createUniversity(@Body() university: University): number {
    return this.universityService.createUniversity(university);
  }
}
