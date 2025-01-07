import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.create';
import { User } from '../user/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a review for a drama' })
  @ApiResponse({ status: 201, description: 'Review successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    return await this.reviewService.review(user.id, createReviewDto);
  }
}
