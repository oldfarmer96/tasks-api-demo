# Express API - Tasks and Users

Production-style API using Express with layered architecture, JWT bearer auth, password hashing with bcryptjs, and SQLite persistence.

## Features

- Express 5 API with route modules
- JWT authentication (`Bearer <token>`)
- Password hashing using `bcryptjs`
- SQLite database (`sqlite3`) with auto table initialization
- Security middlewares: `helmet`, `cors`, rate limiting
- Request logging with `morgan`
- Centralized error handling
- Docker multistage for development and production

## Project Structure

```
src/
  app.js
  server.js
  config/
  middlewares/
  modules/
    auth/
    users/
    tasks/
  utils/
```

## Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

The database file is created automatically at `./data/app.db`.

3. Run in development:

```bash
npm run dev
```

4. Run in production mode:

```bash
npm start
```

## API Endpoints

### Health
- `GET /health`

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Users
- `GET /api/v1/users/me` (requires bearer token)

### Tasks (all require bearer token)
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:taskId`
- `POST /api/v1/tasks`
- `PUT /api/v1/tasks/:taskId`
- `DELETE /api/v1/tasks/:taskId`

## Docker

Build production image:

```bash
docker build -t tasks-users-api --target production .
```

Run container:

```bash
docker run --rm -p 3000:3000 --env-file .env tasks-users-api
```

## Docker Compose

```bash
docker compose up --build -d
```

This uses `compose.yml` and stores SQLite data in a named volume (`sqlite_data`).
