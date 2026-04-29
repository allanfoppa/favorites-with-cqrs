import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoriteCreatedEvent } from './favorite-created.event';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@EventsHandler(FavoriteCreatedEvent)
export class FavoriteCreatedHandler implements IEventHandler<FavoriteCreatedEvent> {
  constructor(
    @InjectModel('Favorite')
    private readonly favoriteModel: Model<any>,
  ) {}

  async handle(event: FavoriteCreatedEvent) {
    console.log('🔥 EVENT RECEIVED', event);
    try {
      const result = await this.favoriteModel.create({
        id: event.id,
        title: event.title,
        url: event.url,
        createdAt: event.createdAt,
      });

      console.log('✅ MONGO INSERT OK', result);
    } catch (err) {
      console.error('❌ MONGO ERROR', err);
    }
  }
}
