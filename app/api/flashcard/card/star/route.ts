import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { id, isStarred } = await req.json();
    const updatedCard = await prisma.flashcard.update({
      where: { id: Number(id) },
      data: { isStarred: !isStarred },
    });
    return NextResponse.json(updatedCard);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi cập nhật sao" }, { status: 500 });
  }
}
