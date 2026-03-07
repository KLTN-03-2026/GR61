import { prisma } from "@/lib/prisma";

export class TodoRepository {
  // ... các hàm cũ (create, update, delete) giữ nguyên ...

  // NEW: Tìm Todo trong một khoảng ngày cụ thể (Dùng cho Thống kê)
  async findByDateRange(userId: number, start: Date, end: Date) {
    return await prisma.todo.findMany({
      where: {
        hocVienId: userId,
        targetDate: { gte: start, lte: end },
      },
      orderBy: { targetDate: "asc" },
    });
  }
}
