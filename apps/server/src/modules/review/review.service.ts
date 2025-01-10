import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/review.create';
import { Review } from './entities/review.entitiy';
import { Drama } from '../drama/entities/drama.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Drama)
    private readonly dramaRepository: Repository<Drama>,
  ) {}

  async review(userId: number, createReviewDto: CreateReviewDto) {
    const { dramaId, rating, content } = createReviewDto;

    const drama = await this.dramaRepository.findOne({
      where: { id: dramaId },
    });
    if (!drama) {
      throw new NotFoundException(`Drama with ID ${dramaId} not found.`);
    }

    const review = this.reviewRepository.create({
      rating,
      content,
      user: { id: userId },
      drama,
    });

    return await this.reviewRepository.save(review);
  }

  async getReviewsByUserId(userId: number) {
    return await this.reviewRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'drama'],
    });
  }
}
