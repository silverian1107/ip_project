import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../like/entities/like.entity';
import { Drama } from '../drama/entities/drama.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Drama])],
  providers: [RecommendService],
  controllers: [RecommendController],
})
export class RecommendModule {}
