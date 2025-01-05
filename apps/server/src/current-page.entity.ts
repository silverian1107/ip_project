import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CurrentPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currentPage: number;
}
