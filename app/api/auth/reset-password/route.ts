import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Nhận 'password' cho khớp với body JSON.stringify({ token, password }) từ Frontend
    const { token, password } = await req.json(); 

    if (!token || !password) {
      return NextResponse.json({ message: "Thiếu dữ liệu" }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: token },
    });

    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json(
        { message: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 400 }
      );
    }

    // Dùng biến 'password' đã nhận ở trên
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật mật khẩu
    await prisma.user.update({
      where: { email: resetToken.email as string },
      data: { password: hashedPassword },
    });

    // Xóa Token thành công
    await prisma.passwordResetToken.delete({
      where: { token: token },
    });

    return NextResponse.json({ message: "Đổi mật khẩu thành công!" });
  } catch (error: any) {
    console.error("Lỗi Reset Password:", error.message);
    return NextResponse.json(
      { message: "Lỗi server: " + error.message },
      { status: 500 }
    );
  }
}