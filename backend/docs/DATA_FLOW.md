# Data Flow — Favorites (CQRS + Outbox + RabbitMQ)

# Create

```text
POST /favorites/create
    ↓
CommandBus
    ↓
CreateFavoriteHandler
    ↓
Postgres INSERT
    ↓
OutboxEvent (favorite.created)
    ↓
OutboxWorker
    ↓
RabbitMQ
    ↓
Consumer
    ↓
Mongo INSERT
```

# Update

```text
PATCH /favorites/patch
    ↓
CommandBus
    ↓
UpdateFavoriteHandler
    ↓
Postgres UPDATE
    ↓
OutboxEvent (favorite.updated)
    ↓
OutboxWorker
    ↓
RabbitMQ
    ↓
Consumer
    ↓
Mongo UPDATE
```

# Delete

```text
DELETE /favorites/5
    ↓
CommandBus
    ↓
DeleteFavoriteHandler
    ↓
Postgres DELETE
    ↓
OutboxEvent (favorite.deleted)
    ↓
OutboxWorker
    ↓
RabbitMQ
    ↓
Consumer
    ↓
Mongo DELETE
```

## Complete flow

```text
Request
  ↓
Command
  ↓
Handler (transaction)
  ↓
Postgres
  ↓
Outbox
  ↓
Worker
  ↓
RabbitMQ
  ↓
Consumer
  ↓
Mongo
  ↓
Query
```
