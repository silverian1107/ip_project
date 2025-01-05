import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drama } from './entities/drama.entity';

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
    const drama = await this.dramaRepository.findOneBy({ id });
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

  // Update a Drama by ID
  async update(id: number, updateData: Partial<Drama>): Promise<Drama> {
    const drama = await this.findById(id);
    Object.assign(drama, updateData);
    return await this.dramaRepository.save(drama);
  }
}
