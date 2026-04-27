import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFavoriteCommand } from './commands/create-favorite.command';
import { UpdateFavoriteCommand } from './commands/update-favorite.command';

import { ListFavoritesQuery } from './queries/list-favorites.query';

@Controller('favorites')
export class FavoritesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('create')
  add(@Body() body: any) {
    return this.commandBus.execute(new CreateFavoriteCommand(body.title, body.url));
  }

  @Get('list')
  getAll() {
    return this.queryBus.execute(new ListFavoritesQuery());
  }

  @Patch('patch')
  update(@Body() body: any) {
    console.log('🔄 UPDATE REQUEST', body);
    return this.commandBus.execute(new UpdateFavoriteCommand(body.id, body.title, body.url, body.isFavorite));
  }
}
