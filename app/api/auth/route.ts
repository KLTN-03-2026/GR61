import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sử dụng Singleton đã tạo

// 1. Hàm GET: Dùng để lấy dữ liệu
export async function GET(request: Request) {
  try {
    // Logic truy vấn dữ liệu ở đây
    return NextResponse.json({ message: "Dữ liệu từ hệ thống của Dũng" });
  } catch (error) {
    console.error("Lỗi API GET:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

// 2. Hàm POST: Dùng để tạo mới dữ liệu
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Logic lưu dữ liệu vào Prisma ở đây
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Lỗi API POST:", error);
    return NextResponse.json(
      { error: "Không thể lưu dữ liệu" },
      { status: 500 },
    );
  }
}
