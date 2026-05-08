import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';

import { FavoritesController } from './favorites.controller';

import { Favorite } from './infrastructure/persistence/postgres/entities/favorites.entity';
import { OutboxEvent } from './infrastructure/persistence/postgres/entities/outbox.entity';

import { FavoriteSchema } from './infrastructure/persistence/mongo/schemas/favorites.schema';

import { CreateFavoriteHandler } from './application/handlers/create-favorite.handler';
import { UpdateFavoriteHandler } from './application/handlers/update-favorite.handler';
import { ListFavoritesHandler } from './application/handlers/list-favorites.handler';
import { DeleteFavoriteHandler } from './application/handlers/delete-favorite.handler';

import { FavoritesPublisher } from './infrastructure/messaging/services/publisher.service';
import { FavoriteCreatedConsumer } from './infrastructure/messaging/consumers/favorite-created.consumer';
import { FavoriteUpdatedConsumer } from './infrastructure/messaging/consumers/favorite-updated.consumer';
import { FavoriteDeletedConsumer } from './infrastructure/messaging/consumers/favorite-deleted.consumer';
import { OutboxWorker } from './infrastructure/messaging/workers/outbox.worker';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),

    TypeOrmModule.forFeature([Favorite], 'write'),

    TypeOrmModule.forFeature([Favorite, OutboxEvent], 'write'),

    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }]),

    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'favorites_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [
    FavoritesController,
    FavoriteCreatedConsumer,
    FavoriteUpdatedConsumer,
    FavoriteDeletedConsumer,
  ],
  providers: [
    CreateFavoriteHandler,
    UpdateFavoriteHandler,
    DeleteFavoriteHandler,
    ListFavoritesHandler,
    FavoritesPublisher,
    OutboxWorker,
  ],
})
export class FavoritesModule {}
