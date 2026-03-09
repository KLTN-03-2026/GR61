import { NextResponse } from "next/server";
import { TodoService } from "@/lib/api/service/TodoService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || "";
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await TodoService.getTodos(userId, date);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("LỖI API TODO GET:", err.message);
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = parseInt(req.headers.get("x-user-id") || "0");

    const data = await TodoService.saveTodo(userId, body);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("LỖI API TODO POST:", err.message);
    return NextResponse.json(
      { error: "Không thể tạo nhiệm vụ" },
      { status: 500 },
    );
  }
}
