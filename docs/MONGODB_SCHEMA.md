# MongoDB Schema Explanation

## User Schema (`users` collection)
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String, enum: `admin|user`, default `user`)
- `createdAt`, `updatedAt` (timestamps)

Purpose:
- Stores authentication and authorization information for each user.

## Task Schema (`tasks` collection)
- `title` (String, required)
- `description` (String)
- `status` (String, enum: `pending|in-progress|completed`)
- `priority` (String, enum: `low|medium|high`)
- `dueDate` (Date, optional)
- `createdBy` (ObjectId reference to User, required)
- `assignedTo` (ObjectId reference to User, optional)
- `createdAt`, `updatedAt` (timestamps)

Purpose:
- Stores task items with metadata and owner assignment.

## Relationships
- One user can create many tasks (`User` -> `Task` via `createdBy`).
- A task may optionally be assigned to another user (`assignedTo`).
