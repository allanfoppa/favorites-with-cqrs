import { Command } from "@nestjs/cqrs";

export class UpdateFavoriteCommand extends Command<{
  id: number,
  title: string,
  url: string,
  isFavorite: boolean
}> {
  constructor(
    public id: number,
    public title: string,
    public url: string,
    public isFavorite: boolean
  ) {
    super();
  }
}
