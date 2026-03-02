import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // 👈 Khai báo là Promise
) {
  try {
    const { id } = await params; // 👈 Cần await để lấy id
    const body = await req.json();
    const todoId = parseInt(id);

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.priority !== undefined && { priority: body.priority }),
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // 👈 Khai báo là Promise
) {
  try {
    const { id } = await params; // 👈 Cần await để lấy id
    const todoId = parseInt(id);

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json({ message: "Đã xóa công việc" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
