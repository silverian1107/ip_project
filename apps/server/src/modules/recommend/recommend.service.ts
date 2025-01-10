import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { IsNull, Not, Repository } from 'typeorm';
import { Drama } from '../drama/entities/drama.entity';
import { Like } from '../like/entities/like.entity';

export class RecommendService {
  private baseURL: string;

  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Drama)
    private readonly dramaRepository: Repository<Drama>,
  ) {
    this.baseURL = 'http://127.0.0.1:8000/api';
  }

  /**
   * Fetch liked dramas by user ID
   * @param userId - User ID
   */
  async getLikedDramasByUser(userId: number) {
    const likes = await this.likeRepository.find({
      where: {
        user: { id: userId },
        drama: Not(IsNull()),
      },
      relations: ['drama'],
    });

    return likes.map((like) => like.drama);
  }

  /**
   * Fetch recommendation dramas based on user's liked dramas
   * @param userId - User ID
   */
  async getRecommendations(userId: number): Promise<Drama[]> {
    try {
      // Step 1: Get the user's liked dramas
      const likedDramas = await this.getLikedDramasByUser(userId);
      if (likedDramas.length === 0) {
        return [];
      }
      // Step 2: Prepare data for recommendation API
      const recommendationInput = likedDramas.map((drama) => ({
        id: drama.id,
        title: drama.title,
        overview: drama.overview,
        popularity: drama.popularity,
        voteAverage: drama.voteAverage,
        voteCount: drama.voteCount,
      }));

      // Step 3: Call the recommendation API
      const response = await axios.post(`${this.baseURL}/dramas/`, {
        dramas: recommendationInput,
      });

      // Step 4: Extract recommended drama titles
      const recommendedTitles =
        response.data?.top_dramas.map((drama) => drama.title) || [];

      // Step 5: Fetch dramas from the repository
      const dramas = await this.findDramasByTitles(recommendedTitles);

      return dramas;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }

  private async findDramasByTitles(titles: string[]): Promise<Drama[]> {
    try {
      return await this.dramaRepository
        .createQueryBuilder('drama')
        .where('drama.title IN (:...titles)', { titles })
        .getMany();
    } catch (error) {
      console.error('Error fetching dramas by titles:', error);
      throw error;
    }
  }
}
