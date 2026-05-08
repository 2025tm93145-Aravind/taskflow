# TaskFlow Architecture Explanation

## Overview
TaskFlow uses a simple monolithic full stack architecture suitable for assignment delivery and fast implementation.

## Frontend Layer
- React + Vite single page app
- React Router for route-level pages
- Axios for HTTP calls
- Tailwind CSS for responsive UI
- Auth context for token + user state

## Backend Layer
- Express app with modular folders:
  - `auth-service`
  - `task-service`
  - `user-service`
- Middleware:
  - JWT authentication (`protect`)
  - Role authorization (`authorizeRoles`)
- REST APIs in one app (no microservices)

## Data Layer
- MongoDB for persistence
- Mongoose models:
  - `User`
  - `Task`

## Request Flow
1. Frontend sends request with JWT token in Authorization header.
2. Backend middleware validates token and loads user.
3. Controller applies role/business rules.
4. Mongoose reads/writes MongoDB.
5. JSON response returned to frontend and rendered.

## Security Design
- Password hashed with bcrypt
- JWT-based stateless authentication
- Admin-only routes restricted by role middleware
