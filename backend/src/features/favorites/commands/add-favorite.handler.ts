
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { AddFavoriteCommand } from './add-favorite.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../favorites.entity';
import { FavoriteCreatedEvent } from '../events/favorite-created.event';

@CommandHandler(AddFavoriteCommand)
export class AddFavoriteHandler implements ICommandHandler<AddFavoriteCommand> {
  constructor(
    @InjectRepository(Favorite, 'write') private repository: Repository<Favorite>,
    private eventBus: EventBus
  ) {}

  async execute(command: AddFavoriteCommand) {
    const { title, url } = command;

    const fav = this.repository.create({
      title,
      url,
    });

    await this.repository.save(fav);

    this.eventBus.publish(
      new FavoriteCreatedEvent(
        fav.id,
        fav.title,
        fav.url,
        fav.createdAt,
      ),
    );

    return fav;
  }
}
