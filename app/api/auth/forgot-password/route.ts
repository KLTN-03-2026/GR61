import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import db from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email là bắt buộc" }, { status: 400 });
    }

    // Kiểm tra User có tồn tại không
    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email này không tồn tại trong hệ thống" }, { status: 404 });
    }

    // Tạo Token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000); 

    await db.passwordResetToken.deleteMany({
      where: { email: email },
    });

    // Tạo Token mới hoàn toàn
    await db.passwordResetToken.create({
      data: { 
        email: email, 
        token: token, 
        expires: expires 
      },
    });
    // --------------------------------------------

    // Cấu hình Mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    const mailOptions = {
      from: `"Hệ thống Học tập Số" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Khôi phục mật khẩu tài khoản",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h3 style="color: #1847ab;">Yêu cầu đặt lại mật khẩu</h3>
          <p>Chào bạn, chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
          <p>Vui lòng click vào nút dưới đây để đổi mật khẩu (link có hiệu lực trong 15 phút):</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="padding: 12px 25px; background-color: #1847ab; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Đặt lại mật khẩu ngay</a>
          </div>
          <p style="color: #666; font-size: 12px;">Nếu nút trên không hoạt động, bạn có thể copy link này: ${resetUrl}</p>
          <p>Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Đã gửi mail thành công!" });

  } catch (error: any) {
    console.error("LỖI API QUÊN MK:", error);
    return NextResponse.json({ message: "Lỗi server: " + error.message }, { status: 500 });
  }
}