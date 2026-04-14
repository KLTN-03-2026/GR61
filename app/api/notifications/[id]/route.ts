import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params; // Await params ở đây
    const updated = await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { isRead: true }
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Lỗi cập nhật thông báo:", error.message);
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}