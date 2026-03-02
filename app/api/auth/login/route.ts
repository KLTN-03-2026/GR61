import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/api/service/AuthService";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const loginResult = await authService.login(email, password);

    if (!loginResult) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không chính xác" },
        { status: 401 },
      );
    }

    const { accessToken, refreshToken, user } = loginResult;

    const res = NextResponse.json({
      message: "Đăng nhập thành công",
      user,
      // ✅ ĐÃ XÓA csrfToken ở đây
    });

    const isLocalhost = process.env.NODE_ENV !== "production";
    const cookieOptions = {
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax" as const,
      path: "/",
    };

    res.cookies.set("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 3600,
    });
    res.cookies.set("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 604800,
    });

    return res;
  } catch (error) {
    console.error("Login Route Error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}
