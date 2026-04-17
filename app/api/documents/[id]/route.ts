import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Mở gói params trước
    const { id } = await params; 
    const docId = Number(id);

    if (isNaN(docId)) {
      return NextResponse.json({ error: "ID tài liệu không hợp lệ" }, { status: 400 });
    }
    const userIdStr = req.headers.get("x-user-id");
    const userId = userIdStr ? Number(userIdStr) : null;

    const [doc, userRecord] = await Promise.all([
      prisma.document.findUnique({ where: { id: docId } }),
      userId ? prisma.user.findUnique({ 
        where: { id: userId },
        select: { hoTen: true } 
      }) : Promise.resolve(null)
    ]);

    if (!doc) {
      return NextResponse.json({ error: "Tài liệu không tồn tại" }, { status: 404 });
    }

    await prisma.document.delete({ 
      where: { id: docId } 
    });

    await prisma.auditLog.create({
      data: {
        userId: userId,
        userName: userRecord?.hoTen || "Học viên", 
        action: "XÓA TÀI LIỆU",
        table: "DOCUMENT",
        detail: `Đã xóa tài liệu: ${doc.title}`,
        type: "DOCUMENT" 
      }
    });

    return NextResponse.json({ message: "Xóa thành công" });

  } catch (error: any) {
    console.error("Lỗi xóa tài liệu:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}