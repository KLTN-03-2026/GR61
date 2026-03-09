import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Logic truy vấn dữ liệu ở đây
    return NextResponse.json({ message: "Dữ liệu từ hệ thống của Dũng" });
  } catch (error) {
    console.error("Lỗi API GET:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Lỗi API POST:", error);
    return NextResponse.json(
      { error: "Không thể lưu dữ liệu" },
      { status: 500 },
    );
  }
}
