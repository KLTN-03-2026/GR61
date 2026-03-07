import { TodoRepository } from "../repositories/TodoRepository";

const repo = new TodoRepository();

export const TodoService = {
  getTodos: async (userId: number, date: string) => {
    return await repo.findByDate(userId, date);
  },

  saveTodo: async (userId: number, data: any) => {
    const { id, ...rest } = data;
    const payload = {
      ...rest,
      hocVienId: userId,
      // Đảm bảo targetDate luôn là kiểu Date object
      targetDate: rest.targetDate ? new Date(rest.targetDate) : undefined,
    };

    return id
      ? await repo.update(Number(id), payload)
      : await repo.create(payload);
  },

  deleteTodo: async (id: number) => {
    return await repo.delete(id);
  },
};
