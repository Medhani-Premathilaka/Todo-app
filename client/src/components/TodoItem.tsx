import { useState } from "react";
import type { Todo, UpdateTodoInput } from "../types/todo";
import { Pencil, Trash2 } from "lucide-react";
import AlertModal from "./AlertModal";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, input: UpdateTodoInput) => void;
  onDelete: (id: string) => void;
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      onUpdate(todo._id, {
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
      className={`bg-white dark:bg-gray-800 rounded-2xl border p-5 transition-all duration-400 ${todo.done ? "border-gray-100 dark:border-gray-700 opacity-60" : "border-gray-100 dark:border-gray-700 shadow-sm"}`}
    >
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
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
            className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-blue-600 cursor-pointer focus:ring-blue-500 focus:ring-offset-gray-800"
          />
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${todo.done ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"}`}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p
                className={`text-xs mt-1 ${todo.done ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}
              >
                {todo.description}
              </p>
            )}
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400 dark:text-gray-500">
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
                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                )}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <AlertModal
          type="danger"
          title="Delete Todo?"
          message="You are about to delete"
          subMessage={todo.title}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => {
            setShowDeleteConfirm(false);
            onDelete(todo._id);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
