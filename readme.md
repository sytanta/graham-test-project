# Task Management API

This is a simple **Task Management API** built with **Node.js**, **Express**, and **MySQL** using **Sequelize** as the ORM. The API allows users to manage tasks, including the ability to create, read, update, and delete tasks. Tasks can also be filtered by their completion status.

## Features

- **Create Task**: Add a new task with a title and description.
- **Get Tasks**: Retrieve a list of all tasks.
- **Get Task by ID**: Retrieve a single task using its ID.
- **Update Task**: Mark a task as completed or modify its status.
- **Delete Task**: Delete a task from the database.

## Prerequisites

Before running the API, ensure that you have:

- **Node.js** and **npm** installed on your machine.
- A **MySQL** server running locally or remotely, with a database created for this project.
- The **MySQL credentials** (username, password, and database name) for setting up the connection.

## Setup

- Install packages `npm i`

- Create 2 MySQL databases. One is for development. The other is for testing

- Create a `.env` file with the following content:

```
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT Configuration
JWT_SECRET=
JWT_EXPIRES_IN=24h
```

- Create a `.env.test` with the following content for testing:

```
PORT="3000"

# Database configuration
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT configuration
JWT_SECRET=
JWT_EXPIRES_IN="24h"
```

- Run `npm run test` to run all test cases

- Run `npm run dev` and makes API requests

## Routes

### Task:

All task routes require users to be authenticated

- `POST /api/tasks` - create a new task. New tasks always have `completed: false`
- `GET /api/tasks` - get all tasks, pagination supported. For ex: `GET /api/tasks?completed=false&page=1&limit=10`
- `GET /api/tasks/:id` - get a task by id
- `PATCH /api/tasks/:id` - update task by id
- `DELETE /api/tasks/:id` - delete task by id

### Authentication

Token-based authentication

- `POST /api/auth/register` - register, `email` & `password` required
- `POST /api/auth/login` - login, `email` & `password` required

## Coding Convention

- Local imports should be below third-party package imports and separated by a new line

- User inputs are validated by `Joi` as a route-level middleware. Some routes will also validate via Sequelize

- Custom errors thrown should be `AppError` (/middleware/error.middleware.ts) for consistency

- All errors will be handled by `errorHandler` middleware (/middleware/error.middleware.ts)

- Not-found routes are handled by `notFound` middleware (/middleware/error.middleware.ts)

- Returned data should be in the following format:

```
{
    status: "success"/"error",
    data: { ... }
    message: "Additional success or error message"
}
```
