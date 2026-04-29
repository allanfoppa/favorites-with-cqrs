import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ListFavoritesQuery } from '../queries/list-favorites.query';

@QueryHandler(ListFavoritesQuery)
export class ListFavoritesHandler
  implements IQueryHandler<ListFavoritesQuery>
{
  constructor(
    @InjectModel('Favorite')
    private readonly model: Model<any>,
  ) {}

  async execute() {
    return this.model.find().lean();
  }
}
