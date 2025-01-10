import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DramaModule } from './modules/drama/drama.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';
import { LikeModule } from './modules/like/like.module';
import { GenreModule } from './modules/genre/genre.module';
import { ReviewModule } from './modules/review/review.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { SearchModule } from './modules/search/search.module';
import { RecommendModule } from './modules/recommend/recommend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    DramaModule,
    AdminModule,
    PostModule,
    FollowerModule,
    LikeModule,
    GenreModule,
    ReviewModule,
    BookmarkModule,
    SearchModule,
    RecommendModule,
  ],
})
export class AppModule {}
