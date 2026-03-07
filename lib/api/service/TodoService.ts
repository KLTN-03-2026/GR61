import { TodoRepository } from "../repositories/TodoRepository";

const repo = new TodoRepository();

export const TodoService = {
  getTodos: async (userId: number, date: string) => {
    return await repo.findByDate(userId, date);
  },

  // Logic gộp: Nếu có ID thì là Update, không thì là Create
  saveTodo: async (userId: number, data: any) => {
    const { id, ...rest } = data;
    const payload = { ...rest, hocVienId: userId };

    return id
      ? await repo.update(parseInt(id), payload)
      : await repo.create(payload);
  },

  removeTodo: async (id: number) => {
    return await repo.delete(id);
  },
};
