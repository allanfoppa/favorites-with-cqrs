import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutboxEvent } from '../../persistence/postgres/entities/outbox.entity';
import { FavoritesPublisher } from '../services/publisher.service';

@Injectable()
export class OutboxWorker {
  private readonly logger = new Logger(OutboxWorker.name);

  constructor(
    @InjectRepository(OutboxEvent, 'write')
    private outboxRepo: Repository<OutboxEvent>,
    private publisher: FavoritesPublisher,
  ) {}

  @Cron('*/5 * * * * *') // every 5 seconds
  async process() {
    const events = await this.outboxRepo.find({
      where: { status: 'pending' },
      take: 50,
      order: { createdAt: 'ASC' },
    });

    for (const event of events) {
      try {
        await this.publisher.publish(event.event, event.payload);

        await this.outboxRepo.update(event.id, {
          status: 'processed',
        });

      } catch (err) {
        this.logger.error('Outbox publish failed', err);

        await this.outboxRepo.update(event.id, {
          retries: event.retries + 1,
          status: event.retries > 5 ? 'failed' : 'pending',
        });
      }
    }
  }
}
