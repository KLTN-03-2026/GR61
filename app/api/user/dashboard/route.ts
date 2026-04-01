import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const userIdHeader = req.headers.get("x-user-id");
    const userId = userIdHeader ? parseInt(userIdHeader) : null;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - Vui lòng đăng nhập" },
        { status: 401 },
      );
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đưa về đầu ngày hôm nay

    const pendingTodos = await prisma.todo.count({
      where: {
        hocVienId: userId,
        status: false,
      },
    });

    const doneTodos = await prisma.todo.count({
      where: {
        hocVienId: userId,
        status: true,
      },
    });

    const totalTodos = pendingTodos + doneTodos;
    const performance =
      totalTodos > 0 ? Math.round((doneTodos / totalTodos) * 100) : 0;

    const flashcardFolders = await prisma.flashcardFolder.count({
      where: { userId: userId },
    });

    return NextResponse.json({
      pendingTodos,
      doneTodos,
      performance,
      flashcardFolders,
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error.message);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
