import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { UpdateFavoriteCommand } from "./update-favorite.command";
import { Favorite } from "../entities/favorites.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FavoriteUpdatedEvent } from "../events/favorite-updated.event";

@CommandHandler(UpdateFavoriteCommand)
export class UpdateFavoriteHandler implements ICommandHandler<UpdateFavoriteCommand> {
  constructor(
    @InjectRepository(Favorite, 'write') private repository: Repository<Favorite>,
    private eventBus: EventBus
  ) {}

  async execute(command: UpdateFavoriteCommand): Promise<{ id: number; title: string; url: string; isFavorite: boolean; }> {
    const { id, title, url, isFavorite } = command;

    // 1. Find and update in the Write DB
    await this.repository.update(id, { title, url, isFavorite });

    // 2. Publish the event with the ID and new data
    this.eventBus.publish(new FavoriteUpdatedEvent(id, title, url, isFavorite));

    return { id, title, url, isFavorite };
  }
}
