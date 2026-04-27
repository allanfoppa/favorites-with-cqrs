
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListFavoritesQuery } from './list-favorites.query';

@QueryHandler(ListFavoritesQuery)
export class ListFavoritesHandler implements IQueryHandler<ListFavoritesQuery> {
constructor(
  @InjectModel('Favorite')
  private model: Model<any>,
) {}

  async execute() {
    return await this.model.find();
  }
}
