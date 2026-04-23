import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import {
  getTodos,
  createTodo,
  updateTodo,
  toggleDone,
  deleteTodo,
} from "../api/todos";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch {
      setError("Failed to load todos. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (input: { title: string; description?: string }) => {
    const tempTodo: Todo = {
      _id: crypto.randomUUID(),
      title: input.title,
      description: input.description || "",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [tempTodo, ...prev]);

    try {
      const newTodo = await createTodo(input);
      setTodos((prev) =>
        prev.map((t) => (t._id === tempTodo._id ? newTodo : t))
      );
    } catch {
      setTodos((prev) => prev.filter((t) => t._id !== tempTodo._id));
    }
  };

  const handleToggle = async (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
    );

    try {
      const updated = await toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      return updated;
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
      );
      return null;
    }
  };

  const handleUpdate = async (
    id: string,
    input: { title: string; description?: string }
  ) => {
    const previous = todos.find((t) => t._id === id);

    setTodos((prev) =>
      prev.map((t) =>
        t._id === id
          ? {
              ...t,
              title: input.title,
              description: input.description || "",
              edited: true,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );

    try {
      const updated = await updateTodo(id, input);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch {
      if (previous) {
        setTodos((prev) => prev.map((t) => (t._id === id ? previous : t)));
      }
    }
  };

  const handleDelete = async (id: string) => {
    const previous = todos.find((t) => t._id === id);
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await deleteTodo(id);
    } catch {
      if (previous) {
        setTodos((prev) => [previous, ...prev]);
      }
    }
  };

  return {
    todos,
    loading,
    error,
    handleAdd,
    handleToggle,
    handleUpdate,
    handleDelete,
  };
};