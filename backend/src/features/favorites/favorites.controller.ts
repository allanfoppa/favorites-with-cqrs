
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AddFavoriteCommand } from './commands/add-favorite.command';
import { GetFavoritesQuery } from './queries/get-favorites.query';

@Controller('favorites')
export class FavoritesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('create')
  add(@Body() body: any) {
    return this.commandBus.execute(new AddFavoriteCommand(body.title, body.url));
  }

  @Get('list')
  getAll() {
    return this.queryBus.execute(new GetFavoritesQuery());
  }
}
