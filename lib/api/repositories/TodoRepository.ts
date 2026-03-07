import { prisma } from "@/lib/prisma";

export class TodoRepository {
  // Lấy danh sách Todo theo một ngày cụ thể (Dùng cho TodoList)
  async findByDate(userId: number, dateStr: string) {
    const start = new Date(dateStr);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dateStr);
    end.setHours(23, 59, 59, 999);

    return await prisma.todo.findMany({
      where: {
        hocVienId: userId,
        targetDate: { gte: start, lte: end },
      },
      orderBy: { createdAt: "asc" },
    });
  }

  // Lấy Todo trong khoảng ngày (Dùng cho Thống kê)
  async findByDateRange(userId: number, start: Date, end: Date) {
    return await prisma.todo.findMany({
      where: {
        hocVienId: userId,
        targetDate: { gte: start, lte: end },
      },
      orderBy: { targetDate: "asc" },
    });
  }

  async create(data: any) {
    return await prisma.todo.create({ data });
  }

  async update(id: number, data: any) {
    return await prisma.todo.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.todo.delete({
      where: { id },
    });
  }
}
