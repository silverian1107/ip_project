import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { LikeService } from './like.service';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('post/:postId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like for a post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully toggled the like status of the post.',
  })
  @ApiResponse({ status: 404, description: 'Post or user not found.' })
  async togglePostLike(
    @GetUser('id') userId: number,
    @Param('postId') postId: number,
  ) {
    return this.likeService.toggleLikePost(userId, postId);
  }

  @Post('drama/:dramaId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like for a drama' })
  @ApiResponse({
    status: 200,
    description: 'Successfully toggled the like status of the drama.',
  })
  @ApiResponse({ status: 404, description: 'Drama or user not found.' })
  async toggleDramaLike(
    @GetUser('id') userId: number,
    @Param('dramaId') dramaId: string,
  ) {
    return this.likeService.toggleLikeDrama(userId, +dramaId);
  }
}
