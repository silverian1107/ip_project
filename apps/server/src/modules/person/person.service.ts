import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  private readonly logger = new Logger(PersonService.name);

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(personData: Partial<Person>): Promise<Person> {
    try {
      const newPerson = this.personRepository.create(personData);
      await this.personRepository.save(newPerson);
      this.logger.log(
        `Person with name ${personData.name} created successfully`,
      );
      return newPerson;
    } catch (error) {
      this.logger.error('Error while creating person', error.stack);
      throw new Error('Failed to create person');
    }
  }

  async findByTmdbId(tmdbId: number): Promise<Person | null> {
    try {
      const person = await this.personRepository.findOne({
        where: { tmdbId },
      });
      if (!person) {
        this.logger.warn(`Person with tmdbId ${tmdbId} not found`);
      }
      return person;
    } catch (error) {
      this.logger.error('Error while finding person by tmdbId', error.stack);
      throw new Error('Failed to find person by tmdbId');
    }
  }
}
