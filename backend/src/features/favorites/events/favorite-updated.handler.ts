import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { FavoriteUpdatedEvent } from "./favorite-updated.event";

@EventsHandler(FavoriteUpdatedEvent)
export class FavoriteUpdatedHandler implements IEventHandler<FavoriteUpdatedEvent> {
  constructor(
    @InjectModel('Favorite')
    private favoriteModel: Model<any>
  ) {}

  async handle(event: FavoriteUpdatedEvent) {
    // 3. Keep the Read DB in sync
    console.log('🔥 UPDATE EVENT RECEIVED', event);
    await this.favoriteModel.updateOne({ id: event.id }, { title: event.title, url: event.url, isFavorite: event.isFavorite });
  }
}
