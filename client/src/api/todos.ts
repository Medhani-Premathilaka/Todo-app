import axios from "axios";
import type { Todo, CreateTodoInput, UpdateTodoInput } from "../types/todo";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get("/todos");
  return data;
};

export const createTodo = async (input: CreateTodoInput): Promise<Todo> => {
  const { data } = await api.post("/todos", input);
  return data;
};

export const updateTodo = async (id: string, input: UpdateTodoInput): Promise<Todo> => {
  const { data } = await api.put(`/todos/${id}`, input);
  return data;
};

export const toggleDone = async (id: string): Promise<Todo> => {
  const { data } = await api.patch(`/todos/${id}/done`);
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};