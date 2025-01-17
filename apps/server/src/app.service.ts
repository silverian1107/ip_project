import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './modules/genre/entities/genre.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async seedGenres() {
    const filePath = path.join(__dirname, 'genre.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const genre of data.genres) {
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

    Logger.debug('Genres seeded successfully!');
  }

  async onApplicationBootstrap() {
    await this.seedGenres();
  }
}
