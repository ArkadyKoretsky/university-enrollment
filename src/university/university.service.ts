import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUniversityDto } from './create-university.dto';
import { University, UniversityDocument } from './university.schema';

@Injectable()
export class UniversityService implements OnModuleInit {
  private totalNumberOfUniversities: number; // check if the collection is empty on startup

  constructor(
    @InjectModel(University.name)
    private universityModel: Model<UniversityDocument>,
  ) {}

  // to check only once if the collection is empty
  // and not each time when creating new university
  async onModuleInit(): Promise<void> {
    this.totalNumberOfUniversities = await this.universityModel
      .countDocuments()
      .exec();
  }

  // get university by id
  async getUniversity(universityId: number): Promise<University> {
    return this.universityModel.findById(universityId).exec();
  }

  // create new university with the given data
  // the id generated with auto increment
  async createUniversity(
    createUniversityDto: CreateUniversityDto,
  ): Promise<number> {
    // find the greatest id (last university added) if the collection is not empty
    if (this.totalNumberOfUniversities > 0) {
      const universityWithGreatestId = await this.universityModel
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .exec();
      createUniversityDto._id = universityWithGreatestId[0]._id + 1;
    } else createUniversityDto._id = 1; // the first university added to the collection
    this.totalNumberOfUniversities++;
    createUniversityDto.currentNumberOfStudents = 0;
    const createdUniversity = new this.universityModel(createUniversityDto);
    await createdUniversity.save();
    return createUniversityDto._id;
  }

  // updates the current capacity of the university after student enrollment
  async updateCurrentCapacity(universityId: number): Promise<University> {
    let university = await this.getUniversity(universityId);
    university.currentNumberOfStudents++;
    return this.universityModel.findByIdAndUpdate(universityId, {
      currentNumberOfStudents: university.currentNumberOfStudents,
    });
  }
}
