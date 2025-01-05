import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tmdbId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  biography?: string;

  @Column({ type: 'varchar', nullable: true })
  birthday?: string;

  @Column({ type: 'varchar', nullable: true })
  deathday?: string;

  @Column({ type: 'int', nullable: true })
  gender?: number;

  @Column({ type: 'varchar', nullable: true })
  homepage?: string;

  @Column({ type: 'int', nullable: true })
  imdbId?: number;

  @Column({ type: 'varchar', nullable: true })
  knownForDepartment?: string;

  @Column({ type: 'varchar', nullable: true })
  placeOfBirth?: string;

  @Column({ type: 'float', nullable: true })
  popularity?: number;

  @Column({ type: 'varchar', nullable: true })
  profilePath?: string;

  @Column({ type: 'simple-array', nullable: true })
  alsoKnownAs?: string[];
}
