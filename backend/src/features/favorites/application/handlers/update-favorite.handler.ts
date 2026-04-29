import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateFavoriteCommand } from '../commands/update-favorite.command';
import { Favorite } from '../../infrastructure/persistence/postgres/entities/favorites.entity';
import { OutboxEvent } from '../../infrastructure/persistence/postgres/entities/outbox.entity';
import { EVENTS } from '../../constants/favorites.constants';

@CommandHandler(UpdateFavoriteCommand)
export class UpdateFavoriteHandler
  implements ICommandHandler<UpdateFavoriteCommand>
{
  constructor(
    @InjectRepository(Favorite, 'write')
    private repository: Repository<Favorite>
  ) {}

  async execute(command: UpdateFavoriteCommand) {
    return this.repository.manager.transaction(async (manager) => {

      const updatePayload: any = {};

      if (command.title !== undefined) updatePayload.title = command.title;
      if (command.url !== undefined) updatePayload.url = command.url;
      if (command.isFavorite !== undefined) updatePayload.isFavorite = command.isFavorite;

      // 1. Update in Postgres
      await manager.update(Favorite, command.id, updatePayload);

      // 2. Save event in Outbox
      await manager.save(OutboxEvent, {
        event: EVENTS.FAVORITE_UPDATED,
        payload: {
          id: command.id,
          ...updatePayload,
        },
      });

      return { id: command.id, ...updatePayload };
    });
  }
}
