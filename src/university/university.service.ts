import { Injectable } from '@nestjs/common';
import { University } from './university.dto';

@Injectable()
export class UniversityService {
  private readonly universities: University[] = [
    {
      id: 1,
      name: 'Open University',
      maxNumberOfStudents: 2000,
      currentNumberOfStudents: 1000,
      minGpa: 85.4,
    },
    {
      id: 2,
      name: 'Haifa University',
      maxNumberOfStudents: 1000,
      currentNumberOfStudents: 999,
      minGpa: 82.6,
    },
    {
      id: 3,
      name: 'Hebrew University',
      maxNumberOfStudents: 2500,
      currentNumberOfStudents: 2500,
      minGpa: 88.4,
    },
  ];

  // get university by id
  getUniversity(id: number): University {
    return this.universities[id - 1];
  }

  // create new university with the given data
  // the id generated with auto increment
  createUniversity(university: University): number {
    university.id = this.universities.length + 1;
    this.universities.push(university);
    return this.universities[this.universities.length - 1].id;
  }

  // updates the current capacity of the university after student enrollment
  updateCurrentCapacity(id: number): void {
    this.universities[id - 1].currentNumberOfStudents++;
  }
}
