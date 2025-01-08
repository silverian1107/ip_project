import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drama } from '../drama/entities/drama.entity';
import { Repository } from 'typeorm';
import { Person } from '../person/entities/person.entity';
import { CommonQuery } from 'src/shared/dto/common.query';
import { PaginationQuery } from 'src/shared/dto/pagination.query';
import { paginateEntities } from 'src/common/utils/paginate-entities';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Drama)
    private readonly dramaRepository: Repository<Drama>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async search(query: CommonQuery, pagination: PaginationQuery) {
    const { search, sort } = query;
    const { page = 1, limit = 10 } = pagination;

    const adjustedLimit = limit > 100 ? 100 : limit;

    const personQuery = this.personRepository
      .createQueryBuilder('person')
      .where('person.name ILIKE :search', { search: `%${search}%` });

    const dramaQuery = this.dramaRepository.createQueryBuilder('drama').where(
      `(
        drama.title ILIKE :search OR
        drama.overview ILIKE :search OR
        CAST(drama.titleTranslations AS TEXT) ILIKE :search OR
        CAST(drama.overviewTranslations AS TEXT) ILIKE :search
      )`,
      { search: `%${search}%` },
    );

    if (sort) {
      const sortOptions: Record<string, string> = {
        popularity: 'drama.popularity',
        releaseDate: 'drama.releaseDate',
      };
      const [field, direction] = sort.split(':');
      if (sortOptions[field]) {
        dramaQuery.orderBy(
          sortOptions[field],
          direction.toUpperCase() as 'ASC' | 'DESC',
        );
      }
    }

    const personsResult = await paginateEntities(personQuery, {
      page,
      limit: adjustedLimit,
    });

    const dramasResult = await paginateEntities(dramaQuery, {
      page,
      limit: adjustedLimit,
    });

    return {
      persons: {
        items: personsResult.items,
        meta: personsResult.meta,
      },
      dramas: {
        items: dramasResult.items,
        meta: dramasResult.meta,
      },
    };
  }
}
