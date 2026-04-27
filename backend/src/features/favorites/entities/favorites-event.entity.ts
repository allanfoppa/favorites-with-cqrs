import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('favorite_events')
export class FavoriteEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @Index()
  type!: string;

  @Column({ type: 'jsonb' })
  payload!: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  @Index()
  createdAt!: Date;
}
