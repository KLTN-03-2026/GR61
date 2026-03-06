import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const userId = parseInt(req.headers.get("x-user-id") || "0");
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const folders = await prisma.flashcardfolder.findMany({
      where: { userId },
      include: {
        _count: {
          select: { flashcards: true }, // Đếm thẻ dựa trên tên quan hệ mới
        },
      },
    });
    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi lấy dữ liệu" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = parseInt(req.headers.get("x-user-id") || "0");
    const folder = await prisma.flashcardfolder.create({
      data: { name: body.name, userId },
    });
    return NextResponse.json(folder);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tạo thư mục" }, { status: 500 });
  }
}
