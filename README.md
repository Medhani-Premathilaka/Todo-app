# Todo App MERN Stack

A full-stack Todo application built with React, TypeScript, Node.js, Express, and MongoDB.

## Project Structure

```
Todo_app/
├── client/       # React + TypeScript + Tailwind CSS frontend
├── server/       # Node.js + Express + MongoDB backend
└── .github/
    └── workflows/
        └── ci.yml  # GitHub Actions CI pipeline
```

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd Todo_app
```

### 2. Start the backend

```bash
cd server
npm install
# create .env file with MONGO_URI and PORT
npm run dev
```

### 3. Start the frontend

```bash
cd client
npm install
# create .env file with VITE_API_URL
npm run dev
```

For detailed setup instructions see:
- [`server/README.md`](./server/README.md)
- [`client/README.md`](./client/README.md)

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, TypeScript, Vite, Tailwind CSS |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB with Mongoose             |
| CI        | GitHub Actions                    |
