import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post(':dramaId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async toggleBookmark(
    @Param('dramaId') dramaId: number,
    @GetUser() user: User,
  ) {
    return this.bookmarkService.toggleBookmark(dramaId, user);
  }
}
