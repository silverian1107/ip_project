import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreService],
})
export class GenreModule {}
