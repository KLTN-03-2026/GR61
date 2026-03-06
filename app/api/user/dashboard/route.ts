import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Lấy ID người dùng từ Header (do Middleware gán)
    const headerList = await headers();
    const userId = Number(headerList.get("x-user-id"));

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Truy vấn đồng thời Todo và Flashcard từ MySQL
    const [totalTodos, doneTodos, flashcardFolders] = await Promise.all([
      prisma.todo.count({ where: { hocVienId: userId } }),
      prisma.todo.count({ where: { hocVienId: userId, status: true } }),
      prisma.flashcardfolder.count({ where: { userId: userId } }),
    ]);

    // 3. Tính toán hiệu suất học tập
    const performance =
      totalTodos > 0 ? Math.round((doneTodos / totalTodos) * 100) : 0;
    const pendingTodos = totalTodos - doneTodos;

    return NextResponse.json({
      doneTodos,
      pendingTodos,
      performance,
      flashcardFolders,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Database Connection Error" },
      { status: 500 },
    );
  }
}
