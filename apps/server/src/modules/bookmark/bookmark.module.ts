import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Drama } from '../drama/entities/drama.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Drama])],
  providers: [BookmarkService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
