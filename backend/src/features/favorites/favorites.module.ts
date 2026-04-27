import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoritesController } from './favorites.controller';

import { Favorite } from './entities/favorites.entity';
import { FavoriteSchema } from './schemas/favorites.schema';

import { CreateFavoriteHandler } from './commands/create-favorite.handler';
import { FavoriteCreatedHandler } from './events/favorite-created.handler';
import { UpdateFavoriteHandler } from './commands/update-favorite.handler';
import { FavoriteUpdatedHandler } from './events/favorite-updated.handler';
import { ListFavoritesHandler } from './queries/list-favorites.handler';

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
    UpdateFavoriteHandler,
    ListFavoritesHandler,
    FavoriteCreatedHandler,
    FavoriteUpdatedHandler
  ],
})
export class FavoritesModule {}
