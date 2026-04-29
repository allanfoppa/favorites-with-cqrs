# NOTES

- The focus of this project is CQRS, Outbox Pattern and Event-Driven Architecture

- Defensive programming (validations, guards, etc.) will be minimized to keep the code simple

- However, write operations MUST:
  - Use correct persistence methods (update vs save)
  - Avoid unintended side effects (e.g., insert instead of update)
  - Preserve data consistency in the write model

- Read model is eventually consistent by design (MongoDB projection)

- Messaging (RabbitMQ) is considered unreliable and handled via Outbox pattern
