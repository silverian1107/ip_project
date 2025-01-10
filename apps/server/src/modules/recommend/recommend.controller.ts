import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { RecommendService } from './recommend.service';

@ApiTags('recommend')
@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get('liked-dramas/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getLikedDramas(@GetUser() user: User) {
    return this.recommendService.getLikedDramasByUser(user.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRecommendations(@GetUser() user: User) {
    return this.recommendService.getRecommendations(user.id);
  }
}
