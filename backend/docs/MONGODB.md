# MongoDB Compass — Query Fields Cheat Sheet

## Query

Defines which documents I want to retrieve from the collection.

```json
{ "isFavorite": true }
```

Will returns only documents where isFavorite is true.

## Project

Defines which specific fields I want to include in the results.

```json
{
  "_id": 0,
  "id": 1,
  "title": 1,
  "url": 1,
  "isFavorite": 1
}
```

1 = include, 0 = exclude

Cannot mix inclusion (1) and exclusion (0) in the same object, except for the _id field.

## Sort

```json
{ "createdAt": -1 }
```

1 = ascending (oldest first)
-1 = descending (newest first)

Multi-field sorting:

```json
{ "isFavorite": -1, "createdAt": -1 }
```

## Collation

```json
{
    "title": "XYZ",
    "strength": 3 // medium comparison
}
```

`strength` goes from 1 to 5.

A complete documentation [here](https://www.mongodb.com/docs/manual/reference/collation/)

## Index Hint

Tells to MongoDB what exactly needs to search, without leaves to him picks what he thinks is better via query.

Example: A customer order status. You know the customer id is 12345, so no Mongo guessing here, pass the exactly id and get the order status
