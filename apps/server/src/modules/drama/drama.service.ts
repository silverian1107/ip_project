import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drama } from './entities/drama.entity';
import { PaginationQuery } from 'src/common/dto/pagination-query.dto';
import { paginateEntities } from 'src/common/utils/paginate-entities';

@Injectable()
export class DramaService {
  constructor(
    @InjectRepository(Drama)
    private readonly dramaRepository: Repository<Drama>,
  ) {}

  async create(dramaData: Partial<Drama>): Promise<Drama> {
    const drama = this.dramaRepository.create(dramaData);
    return await this.dramaRepository.save(drama);
  }

  async findById(id: number): Promise<Drama> {
    const drama = await this.dramaRepository.findOne({
      where: { id },
      relations: ['reviews', 'reviews.user'],
    });
    if (!drama) {
      throw new Error('Drama not found');
    }
    return drama;
  }

  async findByTmdbId(tmdbId: number): Promise<Drama> {
    const drama = await this.dramaRepository.findOne({
      where: { tmdbId },
    });
    if (!drama) {
      throw new Error('Drama not found by TMDB ID');
    }
    return drama;
  }

  async update(id: number, updateData: Partial<Drama>): Promise<Drama> {
    const drama = await this.findById(id);
    Object.assign(drama, updateData);
    return await this.dramaRepository.save(drama);
  }

  async getPopularDramas(): Promise<Drama[]> {
    return await this.dramaRepository.find({
      order: { popularity: 'DESC' },
      take: 10,
    });
  }

  async getNewestDramas(): Promise<Drama[]> {
    return await this.dramaRepository.find({
      order: { releaseDate: 'DESC' },
      take: 25,
    });
  }

  async getDramas(pagination: PaginationQuery) {
    const queryBuilder = this.dramaRepository
      .createQueryBuilder('drama')
      .orderBy('drama.releaseDate', 'DESC');

    return await paginateEntities(queryBuilder, pagination);
  }
}
