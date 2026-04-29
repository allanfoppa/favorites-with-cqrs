import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller()
export class FavoriteDeletedConsumer {
  constructor(
    @InjectModel('Favorite')
    private readonly model: Model<any>,
  ) {}

  @EventPattern('favorite.deleted')
  async handleDeleted(data: any) {
    await this.model.deleteOne({ id: data.id });
  }
}
