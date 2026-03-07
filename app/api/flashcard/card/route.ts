import { NextResponse } from "next/server";
import { FlashcardService } from "@/lib/api/service/FlashcardService";

const service = new FlashcardService();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folderId = parseInt(searchParams.get("folderId") || "0");
  const cards = await service.getCardsByFolder(folderId);
  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const body = await req.json();
  const card = await service.saveCard(body);
  return NextResponse.json(card);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const card = await service.saveCard(body); // saveCard xử lý cả update nếu có id
  return NextResponse.json(card);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  await service.removeCard(id);
  return NextResponse.json({ message: "Đã xóa thẻ" });
}
