# Todo App — Backend

A RESTful API built with Node.js, Express, and MongoDB to power the Todo application.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository and navigate to the server folder:
```bash
   cd server
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the `server/` root:
```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
```

4. Start the development server:
```bash
   npm run dev
```

The API will be running at `http://localhost:5000`

## API Endpoints

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | /api/todos             | Get all todos          |
| POST   | /api/todos             | Create a new todo      |
| PUT    | /api/todos/:id         | Update title/description|
| PATCH  | /api/todos/:id/done    | Toggle done status     |
| DELETE | /api/todos/:id         | Delete a todo          |

## Project Structure

server/
├── server.js              # Entry point
└── src/
├── index.js           # Express app setup
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   └── todo.model.js  # Mongoose schema
├── controllers/
│   └── todo.controller.js  # Business logic
└── routes/
└── todo.routes.js # Route definitions