import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/api/service/AuthService";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const loginResult = await authService.login(email, password);

    if (!loginResult) {
      return NextResponse.json(
        { error: "Sai email hoặc mật khẩu" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({
      message: "Thành công",
      user: loginResult.user,
    });

    // Thiết lập Cookie
    const cookieOptions = {
      httpOnly: true,
      path: "/",
      sameSite: "lax" as const,
    };
    res.cookies.set("access_token", loginResult.accessToken, {
      ...cookieOptions,
      maxAge: 3600,
    });
    res.cookies.set("refresh_token", loginResult.refreshToken, {
      ...cookieOptions,
      maxAge: 604800,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}
