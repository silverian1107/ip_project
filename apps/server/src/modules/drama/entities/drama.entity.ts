import { Like } from 'src/modules/like/entities/like.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drama {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tmdbId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column('jsonb', { nullable: false })
  titleTranslations: { [key: string]: string };

  @Column({ type: 'text', nullable: false })
  overview: string;

  @Column('jsonb', { nullable: false })
  overviewTranslations: { [key: string]: string };

  @Column({ type: 'varchar', nullable: true })
  releaseDate: string;

  @Column({ type: 'boolean', default: false })
  adult: boolean;

  @Column({ type: 'varchar', nullable: true })
  backdropPath: string;

  @Column({ type: 'varchar', nullable: true })
  firstAirDate: string;

  @Column({ type: 'boolean', default: false })
  inProduction: boolean;

  @Column({ type: 'varchar', nullable: true })
  lastAirDate: string;

  @Column({ type: 'float', default: 0 })
  popularity: number;

  @Column({ type: 'varchar', nullable: true })
  posterPath: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  tagline: string;

  @Column({ type: 'float', nullable: true })
  voteAverage: number;

  @Column({ type: 'int', nullable: true })
  voteCount: number;

  @OneToMany(() => Post, (post) => post.drama)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.drama)
  likes: Like[];

  @Column({ type: 'int', default: 0 })
  likeCount: number;
}
