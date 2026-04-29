import { IEvent } from "@nestjs/cqrs";

export class FavoriteCreatedEvent implements IEvent {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly url: string,
    public readonly createdAt: Date,
  ) {}
}
