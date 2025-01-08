import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaService } from './drama.service';
import { DramaController } from './drama.controller';
import { Drama } from './entities/drama.entity';
import { Post } from '../post/entities/post.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Like } from '../like/entities/like.entity';
import { Bookmark } from '../bookmark/entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drama, Post, Genre, Like, Bookmark])],
  controllers: [DramaController],
  providers: [DramaService],
  exports: [DramaService],
})
export class DramaModule {}
