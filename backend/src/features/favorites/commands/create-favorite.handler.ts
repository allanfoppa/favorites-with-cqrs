
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteCommand } from './create-favorite.command';
import { Favorite } from '../entities/favorites.entity';
import { FavoriteCreatedEvent } from '../events/favorite-created.event';

@CommandHandler(CreateFavoriteCommand)
export class CreateFavoriteHandler implements ICommandHandler<CreateFavoriteCommand> {
  constructor(
    @InjectRepository(Favorite, 'write') private repository: Repository<Favorite>,
    private eventBus: EventBus
  ) {}

  async execute(command: CreateFavoriteCommand) {
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
