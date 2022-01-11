import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUniversityDto } from './create-university.dto';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  // get university data by given id
  @Get(':id')
  getUniversity(@Param('id') universityId: number): CreateUniversityDto {
    return this.universityService.getUniversity(universityId);
  }

  // create new university
  @Post()
  createUniversity(@Body() createUniversityDto: CreateUniversityDto): number {
    return this.universityService.createUniversity(createUniversityDto);
  }
}
