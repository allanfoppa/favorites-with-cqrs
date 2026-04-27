import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  url!: string;

  @Column('boolean', { default: false })
  isFavorite!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Index()
  createdAt!: Date;
}
