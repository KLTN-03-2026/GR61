import { NextResponse } from "next/server";
import { FlashcardService } from "@/lib/api/service/FlashcardService";
import prisma from "@/lib/prisma";
import { notificationService } from "@/lib/notification-service";

const service = new FlashcardService();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folderId = parseInt(searchParams.get("folderId") || "0");
  const cards = await service.getCardsByFolder(folderId);
  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const body = await req.json();
  const userId = parseInt(req.headers.get("x-user-id") || "0");
  const card = await service.saveCard(body);
  // Ghi Log: Thêm thẻ mới
  if (card && userId > 0) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { hoTen: true } });
    await prisma.auditLog.create({
      data: {
        userId,
        userName: user?.hoTen || "Học viên",
        action: "THÊM THẺ HỌC",
        table: "flashcard",
        detail: `Đã thêm thẻ mới: ${card.front}`, // Giả sử trường là term (thuật ngữ)
        type: "CREATE",
      }
    });
    await notificationService.create({
        userId,
        title: "THÊM THẺ MỚI",
        message: `Thẻ "${card.front}" đã được thêm vào bộ sưu tập của Bạn.`,
        type: "SUCCESS",
      });
    }
  return NextResponse.json(card);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const userId = parseInt(req.headers.get("x-user-id") || "0");
  const card = await service.saveCard(body); // saveCard xử lý cả update nếu có id
  if (card && userId > 0) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { hoTen: true } });
    await prisma.auditLog.create({
      data: {
        userId,
        userName: user?.hoTen || "Học viên",
        action: "CẬP NHẬT THẺ",
        table: "flashcard",
        detail: `Đã chỉnh sửa thẻ: ${card.front}`,
        type: "UPDATE",
      }
    });
    await notificationService.create({
        userId,
        title: "CẬP NHẬT THẺ",
        message: `Nội dung thẻ "${card.front}" đã được thay đổi thành công.`,
        type: "INFO",
      });
  }
  return NextResponse.json(card);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  const userId = parseInt(req.headers.get("x-user-id") || "0");
  // Lấy thông tin trước khi xóa
  const cardToDelete = await prisma.flashcard.findUnique({ where: { id } });
  await service.removeCard(id);
  if (cardToDelete && userId > 0) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { hoTen: true } });
    await prisma.auditLog.create({
      data: {
        userId,
        userName: user?.hoTen || "Học viên",
        action: "XÓA THẺ HỌC",
        table: "flashcard",
        detail: `Đã xóa thẻ: ${cardToDelete.front}`,
        type: "DELETE",
      }
    });
    await notificationService.create({
        userId,
        title: "XÓA THẺ HỌC",
        message: `Bạn đã gỡ bỏ thẻ "${cardToDelete.front}" khỏi bộ nhớ.`,
        type: "WARN",
      });
  }
  return NextResponse.json({ message: "Đã xóa thẻ" });
}
