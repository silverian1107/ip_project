import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Drama } from '../../drama/entities/drama.entity';

export enum PostType {
  USER_WALL = 'wall',
  DRAMA = 'drama',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.USER_WALL,
  })
  type: PostType;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Drama, (drama) => drama.posts, { nullable: true })
  @JoinColumn({ name: 'dramaId' })
  drama?: Drama;

  @Column({ nullable: true })
  dramaId?: number;

  @CreateDateColumn()
  createdAt: Date;
}
