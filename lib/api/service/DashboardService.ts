import { TodoRepository } from "../repositories/TodoRepository";
import { prisma } from "@/lib/prisma";

const todoRepo = new TodoRepository();

export const DashboardService = {
  getOverview: async (userId: number) => {
    // 1. Lấy dữ liệu Todo hôm nay
    const now = new Date();
    const start = new Date(now.setHours(0, 0, 0, 0));
    const end = new Date(now.setHours(23, 59, 59, 999));
    const todayTodos = await todoRepo.findByDateRange(userId, start, end);

    // 2. Lấy số lượng thư mục Flashcard
    const folderCount = await prisma.flashcardfolder.count({
      where: { userId },
    });

    // 3. Tính toán hiệu suất (Performance) dựa trên lịch sử bài làm gần nhất
    const recentHistory = await prisma.flashcardhistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const avgScore =
      recentHistory.length > 0
        ? Math.round(
            recentHistory.reduce((sum, item) => sum + item.score, 0) /
              recentHistory.length,
          )
        : 0;

    return {
      doneTodos: todayTodos.filter((t) => t.status).length,
      pendingTodos: todayTodos.filter((t) => !t.status).length,
      flashcardFolders: folderCount,
      performance: avgScore,
    };
  },
};
