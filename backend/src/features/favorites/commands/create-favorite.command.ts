import { Command } from "@nestjs/cqrs";

export class CreateFavoriteCommand extends Command<{
  title: string;
  url: string;
}> {
  constructor(public title: string, public url: string) {
    super();
  }
}
