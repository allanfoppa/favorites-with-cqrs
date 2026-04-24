import { Schema } from 'mongoose';

export const FavoriteSchema = new Schema(
  {
    id: Number,
    title: String,
    url: String,
    createdAt: Date,
  },
  { collection: 'favorites' }
);
