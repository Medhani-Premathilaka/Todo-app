# Todo App — Frontend

A clean, responsive Todo application built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v3
- Axios

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see `server/README.md`)

### Installation

1. Navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `client/` root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be running at `http://localhost:5173`

## Project Structure

```
client/src/
├── api/
│   └── todos.ts           # All Axios API calls
├── components/
│   ├── AddTodoForm.tsx     # Form to create a new todo
│   ├── TodoItem.tsx        # Individual todo card with edit/delete
│   └── CompletionAlert.tsx # Animated modal on task completion
├── types/
│   └── todo.ts            # Shared TypeScript interfaces
├── App.tsx                # Root component, state management
└── main.tsx               # Entry point
```

## Features

- View all todos separated into **Pending** and **Completed** sections
- Add a new todo with a title and optional description
- Edit a todo's title and description inline
- Mark a todo as done/undone with a checkbox
- Delete a todo
- Completion celebration modal with animation on marking done
- Created date shown on each todo card
- Loading and error states handled gracefully

## Environment Variables

| Variable        | Description                  | Default                        |
|-----------------|------------------------------|--------------------------------|
| `VITE_API_URL`  | Base URL of the backend API  | `http://localhost:5000/api`    |

## Available Scripts

| Script            | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start development server           |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## Assumptions & Limitations

- No authentication — all todos are shared globally (no per-user data)
- No pagination — all todos are fetched at once
- Optimistic UI updates on add, toggle, and delete for a snappy experience
- Edit is disabled on completed todos — mark as undone first to re-edit