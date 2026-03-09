import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Lấy ID từ Header do Middleware gán
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Truy vấn model flashcardhistory
    const history = await prisma.flashcardhistory.findMany({
      where: { userId },
      include: {
        folder: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Lỗi API GET History:", error);
    return NextResponse.json({ error: "Lỗi lấy dữ liệu" }, { status: 500 });
  }
}

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
