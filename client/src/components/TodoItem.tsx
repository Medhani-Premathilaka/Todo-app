import { useState } from "react";
import type { Todo, UpdateTodoInput } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onUpdate: (id: string, input: UpdateTodoInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onUpdate(todo._id, {
        title: title.trim(),
        description: description.trim(),
      });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-2xl border p-5 transition-all ${todo.done ? "border-gray-100 opacity-60" : "border-gray-100 shadow-sm"}`}
    >
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo._id)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer"
          />
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${todo.done ? "line-through text-gray-400" : "text-gray-800"}`}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p
                className={`text-xs mt-1 ${todo.done ? "text-gray-300" : "text-gray-500"}`}
              >
                {todo.description}
              </p>
            )}
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="flex gap-2 shrink-0">
                {!todo.done && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(todo._id)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
