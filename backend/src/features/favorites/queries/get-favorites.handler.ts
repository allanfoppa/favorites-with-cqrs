
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFavoritesQuery } from './get-favorites.query';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@QueryHandler(GetFavoritesQuery)
export class GetFavoritesHandler implements IQueryHandler<GetFavoritesQuery> {
constructor(
  @InjectModel('Favorite')
  private model: Model<any>,
) {}

  async execute() {
    return await this.model.find();
  }
}
