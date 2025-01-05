import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerService } from './worker.service';
import { Drama } from './modules/drama/entities/drama.entity';
import { Genre } from './modules/genre/entities/genre.entity';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { Post } from './modules/post/entities/post.entity';
import { User } from './modules/user/entities/user.entity';
import { Like } from './modules/like/entities/like.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CurrentPage } from './current-page.entity';
import { Person } from './modules/person/entities/person.entity';
import { PersonModule } from './modules/person/person.module';
import { DramaModule } from './modules/drama/drama.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([
      Drama,
      Genre,
      Post,
      User,
      Like,
      CurrentPage,
      Person,
    ]),
    DatabaseModule,
    PersonModule,
    DramaModule,
    ScheduleModule.forRoot(),
  ],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
