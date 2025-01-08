import { Drama } from 'src/modules/drama/entities/drama.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Drama, (drama) => drama.bookmarks, {
    onDelete: 'CASCADE',
  })
  drama: Drama;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
