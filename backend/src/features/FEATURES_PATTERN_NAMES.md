
## CQRS & Event Naming Convention

| Type | Pattern | Example |
| :--- | :--- | :--- |
| **Command** | `[action]-[entity].command.ts` | `create-favorite.command.ts` |
| **Command Handler** | `[action]-[entity].command-handler.ts` | `create-favorite.command-handler.ts` |
| **Query** | `[action]-[entity].query.ts` | `list-favorites.query.ts` |
| **Query Handler** | `[action]-[entity].query-handler.ts` | `list-favorites.query-handler.ts` |
| **Event** | `[entity]-[fact].event.ts` | `favorite-created.event.ts` |
| **Event Handler** | `[entity]-[fact].event-handler.ts` | `favorite-created.event-handler.ts` |

---

## Semantic Strategy

### 1. Resource Lifecycle (e.g., Links)
The focus here is on **existence**. The resource (e.g., a Link) does not exist in the system until the user decides to create it. If it is deleted, it ceases to exist for all users.

* **Verbs:** `create` / `delete` (or `destroy`)
* **Intent:** To manage the lifecycle of an independent entity.
* **Suggested Files:**
    * `create-link.command.ts`
    * `delete-link.command.ts`

### 2. Collection Management (e.g., Favorites)
The focus here is on the **association**. The item already exists in the system; you are merely changing the state of a list or a pivot table.

* **Verbs:** `add` / `remove`
* **Intent:** To manage relationships between existing entities.
* **Suggested Files:**
    * `add-favorite.command.ts`
    * `remove-favorite.command.ts`

