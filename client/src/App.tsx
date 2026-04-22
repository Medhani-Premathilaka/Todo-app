import { useEffect, useState } from "react";
import type { Todo } from "./types/todo";
import {
  getTodos,
  createTodo,
  updateTodo,
  toggleDone,
  deleteTodo,
} from "./api/todos";
import AddTodoForm from "./components/AddTodoForm";
import TodoItem from "./components/TodoItem";
import CompletionAlert from "./components/CompletionAlert";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ id: string; title: string } | null>(
    null,
  );

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
    const newTodo = await createTodo(input);
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = async (id: string) => {
    const updated = await toggleDone(id);
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));

    if (updated.done) {
      setToast({ id: updated._id, title: updated.title });
    }
  };

  const handleUpdate = async (
    id: string,
    input: { title: string; description?: string },
  ) => {
    const updated = await updateTodo(id, input);
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const pending = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pending.length} remaining · {completed.length} completed
          </p>
        </div>

        <AddTodoForm onAdd={handleAdd} />

        {loading && (
          <p className="text-center text-gray-400 text-sm py-12">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-400 text-sm py-12">{error}</p>
        )}

        {!loading && !error && todos.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">
            No todos yet. Add one above!
          </p>
        )}

        {pending.length > 0 && (
          <div className="space-y-3 mb-8">
            {pending.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {completed.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Completed
            </p>
            <div className="space-y-3">
              {completed.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggle}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {toast && (
        <CompletionAlert
          key={toast.id}
          title={toast.title}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}
