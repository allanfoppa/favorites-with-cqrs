import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFavoriteCommand } from './application/commands/create-favorite.command';
import { UpdateFavoriteCommand } from './application/commands/update-favorite.command';
import { DeleteFavoriteCommand } from './application/commands/delete-favorite.command';

import { ListFavoritesQuery } from './application/queries/list-favorites.query';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  add(@Body() body: CreateFavoriteCommand) {
    console.log('🔄 CREATE REQUEST', body);
    return this.commandBus.execute(
      new CreateFavoriteCommand(body.title, body.url),
    );
  }

  @Get()
  getAll() {
    console.log('🔄 LIST REQUEST');
    return this.queryBus.execute(new ListFavoritesQuery());
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateFavoriteCommand) {
    console.log('🔄 UPDATE REQUEST', id, body);
    return this.commandBus.execute(
      new UpdateFavoriteCommand(
        Number(id),
        body.title,
        body.url,
        body.isFavorite,
      ),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteFavoriteCommand(Number(id)));
  }
}
