import { NextResponse } from "next/server";
import { TodoService } from "@/lib/api/service/TodoService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || "";
    const userId = parseInt(req.headers.get("x-user-id") || "0"); // ID từ middleware

    const data = await TodoService.getTodos(userId, date);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Lỗi GET" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = parseInt(req.headers.get("x-user-id") || "0");
    const data = await TodoService.saveTodo(userId, body);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Lỗi POST" }, { status: 500 });
  }
}
