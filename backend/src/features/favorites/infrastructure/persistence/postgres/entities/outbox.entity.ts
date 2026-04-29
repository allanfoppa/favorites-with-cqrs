import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

type OutboxEventStatus = 'pending' | 'processed' | 'failed';

@Entity('outbox_events')
export class OutboxEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  event!: string;

  @Column({ type: 'jsonb' })
  payload!: any;

  @Column({ default: 'pending' })
  status!: OutboxEventStatus;

  @Column({ default: 0 })
  retries!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
