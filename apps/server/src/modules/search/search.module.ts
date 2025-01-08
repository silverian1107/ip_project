import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/entities/person.entity';
import { Drama } from '../drama/entities/drama.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Drama, Person])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
