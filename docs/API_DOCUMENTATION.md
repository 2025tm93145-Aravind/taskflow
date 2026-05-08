# TaskFlow API Documentation

Base URL: `http://localhost:5000/api`

## Health
- `GET /health`

## Auth APIs

### Register
- `POST /auth/register`
- Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123",
  "role": "user",
  "adminSecret": "optional-if-role-admin"
}
```

### Login
- `POST /auth/login`
- Body:
```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```

### Get Logged-in User
- `GET /auth/me`
- Header: `Authorization: Bearer <token>`

## Task APIs (Protected)

### Get Tasks
- `GET /tasks`
- Query params (optional): `search`, `status`, `priority`

### Create Task
- `POST /tasks`
- Body:
```json
{
  "title": "Create wireframes",
  "description": "For sprint planning",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-05-20"
}
```

### Update Task
- `PUT /tasks/:id`

### Delete Task
- `DELETE /tasks/:id`

## User APIs (Admin only)

### Get All Users
- `GET /users`

### Update User Role
- `PATCH /users/:id/role`
- Body:
```json
{
  "role": "admin"
}
```

## Status Codes
- `200` success
- `201` created
- `400` bad request
- `401` unauthorized
- `403` forbidden
- `404` not found
- `500` server error
