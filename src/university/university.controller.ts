import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUniversityDto } from './create-university.dto';
import { University } from './university.schema';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  // get university data by given id
  @Get(':id')
  async getUniversity(@Param('id') universityId: number): Promise<University> {
    return this.universityService.getUniversity(universityId);
  }

  // create new university
  @Post()
  async createUniversity(
    @Body() createUniversityDto: CreateUniversityDto,
  ): Promise<number> {
    return this.universityService.createUniversity(createUniversityDto);
  }

  // for debug purpose
  @Put(':id')
  async updateCapacity(@Param('id') universityId: number): Promise<University> {
    return this.universityService.updateCurrentCapacity(universityId);
  }
}
