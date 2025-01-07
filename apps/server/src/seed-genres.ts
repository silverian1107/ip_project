import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './modules/genre/entities/genre.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const genreRepository: Repository<Genre> = app.get(getRepositoryToken(Genre));

  const genres = [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ];

  const genreEntities = genres.map((genre) => {
    const entity = new Genre();
    entity.tmdbId = genre.id;
    entity.name = genre.name;
    return entity;
  });

  // Save all genres, skipping duplicates
  await genreRepository.save(genreEntities, { chunk: 50 });

  await app.close();
}

bootstrap();
