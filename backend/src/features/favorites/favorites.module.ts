
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './favorites.entity';
import { FavoriteSchema } from './favorites.schema';

import { AddFavoriteHandler } from './commands/add-favorite.handler';
import { GetFavoritesHandler } from './queries/get-favorites.handler';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteCreatedHandler } from './events/favorite-created.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Favorite], 'write'),
    MongooseModule.forFeature([
      { name: 'Favorite', schema: FavoriteSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [
    AddFavoriteHandler,
    GetFavoritesHandler,
    FavoriteCreatedHandler
  ],
})
export class FavoritesModule {}
