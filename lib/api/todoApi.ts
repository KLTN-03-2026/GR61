import axios from "axios";

export const createTodo = async (data: {
  title: string;
  priority: string;
  targetDate: string;
}) => {
  return await axios.post("/api/todo", data);
};

export const updateTodoStatus = async (id: number, status: boolean) => {
  return await axios.patch(`/api/todo/${id}`, { status });
};

export const deleteTodo = async (id: number) => {
  return await axios.delete(`/api/todo/${id}`);
};
