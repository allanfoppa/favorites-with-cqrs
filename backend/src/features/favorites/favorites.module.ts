import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoritesController } from './favorites.controller';

import { Favorite } from './favorites.entity';
import { FavoriteSchema } from './favorites.schema';

import { CreateFavoriteHandler } from './commands/create-favorite.handler';
import { ListFavoritesHandler } from './queries/list-favorites.handler';
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
    CreateFavoriteHandler,
    ListFavoritesHandler,
    FavoriteCreatedHandler
  ],
})
export class FavoritesModule {}
