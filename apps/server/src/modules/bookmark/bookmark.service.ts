import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async toggleBookmark(dramaId: number, user: User) {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { drama: { id: dramaId }, user: { id: user.id } },
    });
    if (bookmark) {
      await this.bookmarkRepository.remove(bookmark);
      return 'Bookmark removed';
    } else {
      const newBookmark = this.bookmarkRepository.create({
        drama: { id: dramaId },
        user: { id: user.id },
      });
      await this.bookmarkRepository.save(newBookmark);
      return 'Bookmark added';
    }
  }
}
