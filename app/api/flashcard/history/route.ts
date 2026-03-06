import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. LẤY LỊCH SỬ (Dùng cho trang History và Biểu đồ)
export async function GET(req: Request) {
  try {
    // Lấy ID từ Header do Middleware gán
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Truy vấn model flashcardhistory (viết thường theo kết quả db pull)
    const history = await prisma.flashcardhistory.findMany({
      where: { userId },
      include: {
        folder: {
          select: { name: true }, // Lấy tên thư mục để hiển thị lên Card
        },
      },
      orderBy: {
        createdAt: "desc", // Bài mới nhất hiện lên đầu
      },
      take: 20, // Lấy 20 bài gần nhất để tránh lag biểu đồ
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Lỗi API GET History:", error);
    return NextResponse.json({ error: "Lỗi lấy dữ liệu" }, { status: 500 });
  }
}

// 2. LƯU LỊCH SỬ (Dùng sau khi làm xong Quiz)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const score = (body.correct / body.total) * 100;

    const history = await prisma.flashcardhistory.create({
      data: {
        userId,
        folderId: body.folderId,
        correctAnswers: body.correct,
        totalQuestions: body.total,
        score: score,
        timeSpent: body.time,
      },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Lỗi lưu lịch sử:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
