import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drama } from '../drama/entities/drama.entity';
import { Review } from './entities/review.entitiy';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Drama])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
