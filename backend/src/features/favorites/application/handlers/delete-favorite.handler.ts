import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteFavoriteCommand } from '../commands/delete-favorite.command';

import { Favorite } from '../../infrastructure/persistence/postgres/entities/favorites.entity';
import { OutboxEvent } from '../../infrastructure/persistence/postgres/entities/outbox.entity';

import { EVENTS } from '../../constants/favorites.constants';

@CommandHandler(DeleteFavoriteCommand)
export class DeleteFavoriteHandler
  implements ICommandHandler<DeleteFavoriteCommand>
{
  constructor(
    @InjectRepository(Favorite, 'write')
    private repository: Repository<Favorite>
  ) {}

  async execute(command: DeleteFavoriteCommand) {
    return this.repository.manager.transaction(async (manager) => {

      // 1. Delete from Postgres
      await manager.delete(Favorite, command.id);

      // 2. Save event in Outbox
      await manager.save(OutboxEvent, {
        event: EVENTS.FAVORITE_DELETED,
        payload: {
          id: command.id,
        },
      });

      return { id: command.id };
    });
  }
}
