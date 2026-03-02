import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!dateStr)
      return NextResponse.json({ error: "Missing date" }, { status: 400 });

    const startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);

    const todos = await prisma.todo.findMany({
      where: {
        hocVienId: userId,
        targetDate: { gte: startOfDay, lte: endOfDay },
      },
      orderBy: { priority: "desc" },
    });

    return NextResponse.json(todos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    const todo = await prisma.todo.create({
      data: {
        title: body.title,
        priority: body.priority || "MEDIUM",
        targetDate: new Date(body.targetDate),
        hocVienId: userId,
        status: false,
      },
    });
    return NextResponse.json(todo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
