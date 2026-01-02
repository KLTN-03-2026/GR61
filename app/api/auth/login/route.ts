// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/api/service/AuthService";
import { setCsrfCookie } from "@/lib/csrf";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const loginResult = await authService.login(email, password);

    if (!loginResult) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không chính xác" },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken, user } = loginResult;
    const csrfToken = await setCsrfCookie();

    const res = NextResponse.json({
      message: "Đăng nhập thành công",
      user, // Frontend sẽ lưu cái này vào Zustand
      csrfToken,
    });

    const isLocalhost = process.env.NODE_ENV !== "production";
    const cookieOptions = {
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax" as const,
      path: "/",
    };

    // Thiết lập cặp bài trùng Access & Refresh Token
    res.cookies.set("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60, // 1 giờ
    });

    res.cookies.set("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });

    return res;
  } catch (error) {
    console.error("Login Route Error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}
