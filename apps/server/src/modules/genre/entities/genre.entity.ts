import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tmdbId: number;

  @Column()
  name: string;

  @Column({ type: 'jsonb', default: {} })
  translations: Record<string, string>;
}
