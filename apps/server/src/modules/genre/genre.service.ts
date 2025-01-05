import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import genresData from './genre.json';

@Injectable()
export class GenreService implements OnModuleInit {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async seedGenres() {
    const genres = genresData;

    for (const genre of genres) {
      const existingGenre = await this.genreRepository.findOne({
        where: { tmdbId: genre.id },
      });

      if (!existingGenre) {
        const newGenre = this.genreRepository.create({
          tmdbId: genre.id,
          name: genre.name,
          translations: genre.translations,
        });
        await this.genreRepository.save(newGenre);
      }
    }

    Logger.log('Genres seeded successfully!');
  }

  async onModuleInit() {
    await this.seedGenres();
  }
}
