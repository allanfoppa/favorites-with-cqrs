import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller()
export class FavoriteCreatedConsumer {
  constructor(
    @InjectModel('Favorite')
    private readonly model: Model<any>,
  ) {}

  @EventPattern('favorite.created')
  async handle(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    try {
      await this.model.updateOne(
        { id: data.id },
        data,
        { upsert: true },
      );

      channel.ack(message);

    } catch (err) {
      console.error('❌ create consumer error', err);
      channel.nack(message, false, true);
    }
  }
}
