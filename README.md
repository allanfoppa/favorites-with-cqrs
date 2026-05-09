# Favorites with CQRS

A full-stack proof-of-concept application demonstrating a favorites management system built with:

- **Backend**: NestJS, CQRS, TypeORM/Postgres write model, Mongoose/Mongo read model, RabbitMQ event bus, Outbox pattern
- **Frontend**: Angular 21 application with a simple favorites UI
- **Infrastructure**: Docker Compose for PostgreSQL, MongoDB, and RabbitMQ

## Project Summary

This project is designed to show a CQRS-oriented architecture for a favorites feature.

### What was built

- A **write-side backend** that handles commands for:
  - creating favorites
  - updating favorites
  - deleting favorites
- A **read-side backend** that serves favorites queries from MongoDB
- A **command/query separation** using NestJS `@nestjs/cqrs`
- An **outbox pattern** that writes events to Postgres inside the same transaction as the write model
- A **polling worker** that publishes pending outbox events to RabbitMQ every 5 seconds
- RabbitMQ **event consumers** that update the MongoDB read model for eventual consistency
- An **Angular frontend** that interacts with the backend through HTTP calls

## Architecture Overview

### Backend

The backend is structured around a `favorites` feature module.

- **Write model**: uses Postgres via TypeORM
  - `Favorite` entity persisted in Postgres
  - `OutboxEvent` entity stored in Postgres for reliable event publishing
- **CQRS commands**:
  - `CreateFavoriteCommand`
  - `UpdateFavoriteCommand`
  - `DeleteFavoriteCommand`
- **CQRS query**:
  - `ListFavoritesQuery`
- **Outbox worker**:
  - `OutboxWorker` polls pending events from Postgres
  - publishes events through `FavoritesPublisher` to RabbitMQ
  - marks events as `processed` or retries if publishing fails
- **Event consumers**:
  - `favorite.created`
  - `favorite.updated`
  - `favorite.deleted`
- **Read model**: uses MongoDB via Mongoose
  - consumers update Mongo documents using event payloads
  - frontend `GET /favorites` reads from MongoDB

### Frontend

The frontend is an Angular 21 application that provides a favorites UI.

- `FavoriteService` sends HTTP commands to the backend
- `create`, `update`, `delete`, and `getFavorites` operations are implemented as service methods
- command models are defined in `frontend/src/app/features/favorites/models/favorite.model.ts`
- Angular components consume the favorites service and display the list of favorites

## Getting Started

### Prerequisites

- Node.js 20+ / npm 11+
- `pnpm` installed globally is recommended for the backend, but npm works too
- Docker and Docker Compose

### Start infrastructure

From the project root:

```bash
docker compose up -d
```

This launches:

- PostgreSQL on `localhost:5432`
- MongoDB on `localhost:27017`
- RabbitMQ on `localhost:5672` (management UI at `http://localhost:15672`, login `admin/admin`)

### Backend setup

From `/backend`:

```bash
cd backend
pnpm install
```

Create a `.env` file or export environment variables. Example values:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=favorites
MONGO_URL=mongodb://localhost:27017/favorites
```

Run database migrations:

```bash
pnpm run migration:run
```

Start the backend:

```bash
pnpm run start:dev
```

The backend listens on `http://localhost:3000`.

### Frontend setup

From `/frontend`:

```bash
cd frontend
npm install
npm run start
```

Then open `http://localhost:4200` in your browser.

## API Endpoints

The backend exposes these endpoints in `FavoritesController`:

- `POST /favorites` — create a new favorite
- `GET /favorites` — list favorites
- `PUT /favorites/:id` — update a favorite
- `DELETE /favorites/:id` — delete a favorite

## Key Concepts Implemented

### CQRS

The project separates write operations (commands) from read operations (queries):

- Write operations go through `CommandBus`
- Read operations go through `QueryBus`

### Outbox Pattern

Command handlers write both the domain entity and a matching outbox event in the same transaction.

This guarantees that events are not lost when the write model is updated.

### Event-driven Read Model

A worker publishes events to RabbitMQ. Consumers listen to those events and update the MongoDB read model.

This pattern enables:

- eventual consistency
- loose coupling between write and read models
- the ability to scale read optimized storage separately from write storage

## Repository Structure

- `/backend` — NestJS backend application
  - `src/app.module.ts` — root module
  - `src/features/favorites` — favorites feature module
  - `src/features/favorites/application` — CQRS commands, queries, and handlers
  - `src/features/favorites/infrastructure/persistence/postgres` — write model entities
  - `src/features/favorites/infrastructure/persistence/mongo` — read model schema
  - `src/features/favorites/infrastructure/messaging` — RabbitMQ publisher, consumers, outbox worker
  - `src/migrations` — TypeORM migration files
- `/frontend` — Angular application
  - `src/app/features/favorites` — favorites UI implementation
  - `src/app/features/favorites/services` — backend API client
  - `src/app/features/favorites/models` — command/query models and favorite model

## Notes

- The current backend configuration points to `amqp://admin:admin@localhost:5672` for RabbitMQ.
- The frontend directly calls `http://localhost:3000/favorites`.
- The implementation uses eventual consistency between Postgres and MongoDB.
- There are several changes to get better UX, but this is not the point of this study

## What was done in this project

- Built a favorites feature using modern backend patterns
- Implemented command handlers for write operations and query handlers for reads
- Wired an outbox worker to reliably publish domain events to RabbitMQ
- Added RabbitMQ consumers to synchronize a MongoDB read model
- Built a frontend that issues CRUD commands and queries the backend

## Additional resources

- `backend/README.md` — base NestJS starter README
- `backend/docs` — personal notes during the study
- `frontend/README.md` — Angular CLI generated README
- `frontend/src/app/features/NOTES.md` — personal notes
