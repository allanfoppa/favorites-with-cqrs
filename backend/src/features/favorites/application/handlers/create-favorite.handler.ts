import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFavoriteCommand } from '../commands/create-favorite.command';
import { Favorite } from '../../infrastructure/persistence/postgres/entities/favorites.entity';
import { OutboxEvent } from '../../infrastructure/persistence/postgres/entities/outbox.entity';
import { EVENTS } from '../../constants/favorites.constants';

@CommandHandler(CreateFavoriteCommand)
export class CreateFavoriteHandler
  implements ICommandHandler<CreateFavoriteCommand>
{
  constructor(
    @InjectRepository(Favorite, 'write')
    private repository: Repository<Favorite>
  ) {}

  async execute(command: CreateFavoriteCommand) {
    return this.repository.manager.transaction(async (manager) => {

      // 1. Save to Postgres
      const fav = await manager.save(Favorite, {
        title: command.title,
        url: command.url,
      });

      // 2. Save event in Outbox
      await manager.save(OutboxEvent, {
        event: EVENTS.FAVORITE_CREATED,
        payload: {
          id: fav.id,
          title: fav.title,
          url: fav.url,
          createdAt: fav.createdAt,
        },
      });

      return fav;
    });
  }
}
