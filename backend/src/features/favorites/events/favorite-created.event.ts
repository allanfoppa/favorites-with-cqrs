export class FavoriteCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly url: string,
    public readonly createdAt: Date,
  ) {}
}
