# TaskFlow - Team Task Management Portal

TaskFlow is a full stack team task management web app built for a Full Stack Application Development assignment.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT

## Project Structure
```
taskflow/
  backend/
  frontend/
  docs/
```

## Quick Start

### 1) Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and backend runs at `http://localhost:5000`.

## Feature Checklist
- User registration/login
- JWT authentication
- Role-based access (admin/user)
- Task CRUD
- Search and filter dashboard
- Responsive UI
- REST APIs
- MongoDB persistence

## Deliverables
- API docs: `docs/API_DOCUMENTATION.md`
- Architecture: `docs/ARCHITECTURE.md`
- MongoDB schema explanation: `docs/MONGODB_SCHEMA.md`
- AI usage reflection: `docs/AI_REFLECTION_REPORT.md`
- GitHub setup instructions: `docs/GITHUB_SETUP.md`
- Postman collection: `docs/TaskFlow.postman_collection.json`
