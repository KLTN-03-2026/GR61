// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/api/service/AuthService";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Thiếu refresh token" },
        { status: 401 }
      );
    }

    const result = await authService.refreshAccessToken(refreshToken);

    if (!result) {
      // Nếu refresh token sai hoặc hết hạn, buộc người dùng đăng nhập lại
      return NextResponse.json(
        { error: "Phiên đăng nhập hết hạn" },
        { status: 403 }
      );
    }

    const res = NextResponse.json({ message: "Gia hạn thành công" });
    const isLocalhost = process.env.NODE_ENV !== "production";

    res.cookies.set("access_token", result.newAccessToken, {
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
