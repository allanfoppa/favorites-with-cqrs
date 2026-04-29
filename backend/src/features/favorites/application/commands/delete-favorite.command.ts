import { Command } from '@nestjs/cqrs';

export class DeleteFavoriteCommand extends Command<{ id: number }> {
  constructor(public id: number) {
    super();
  }
}
