import { Sun, Moon } from "lucide-react";
import { useTodos } from "./hooks/useTodos";
import { useDarkMode } from "./hooks/useDarkMode";
import AddTodoForm from "./components/AddTodoForm";
import TodoItem from "./components/TodoItem";
import AlertModal from "./components/AlertModal";
import { useState } from "react";

export default function App() {
  const { todos, loading, error, handleAdd, handleToggle, handleUpdate, handleDelete } = useTodos();
  const { dark, toggleDark } = useDarkMode();
  const [toast, setToast] = useState<{ id: string; title: string } | null>(null);

  const onToggle = async (id: string) => {
    const updated = await handleToggle(id);
    if (updated?.done) {
      setToast({ id: updated._id, title: updated.title });
    }
  };

  const pending = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-400">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Todos
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {pending.length} remaining · {completed.length} completed
            </p>
          </div>
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <AddTodoForm onAdd={handleAdd} />

        {loading && (
          <p className="text-center text-gray-400 text-sm py-12">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-400 text-sm py-12">{error}</p>
        )}
        {!loading && !error && todos.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-600 text-sm py-12">
            No todos yet. Add one above!
          </p>
        )}

        {pending.length > 0 && (
          <div className="space-y-3 mb-8">
            {pending.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
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
                  onToggle={onToggle}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <AlertModal
          type="success"
          title="Yey! 🎉"
          message="You completed"
          subMessage={toast.title}
          confirmLabel="Awesome!"
          autoClose={true}
          onConfirm={() => setToast(null)}
          onCancel={() => setToast(null)}
        />
      )}
    </div>
  );
}