
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFavoriteCommand } from './commands/create-favorite.command';

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
}
