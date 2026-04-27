import { Command } from "@nestjs/cqrs/dist/classes/command";

export class CreateFavoriteCommand extends Command<{
  title: string;
  url: string;
}> {
  constructor(public title: string, public url: string) {
    super();
  }
}
