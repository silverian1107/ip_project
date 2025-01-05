import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaService } from './drama.service';
import { DramaController } from './drama.controller';
import { Drama } from './entities/drama.entity';
import { Post } from '../post/entities/post.entity';
import { Genre } from '../genre/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drama, Post, Genre])],
  controllers: [DramaController],
  providers: [DramaService],
  exports: [DramaService],
})
export class DramaModule {}
