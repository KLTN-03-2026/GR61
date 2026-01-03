// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/middlewares/auth.middleware";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Danh sách route công khai
  const publicRoutes = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/csrf",
    "/api/auth/refresh",
    "/auth/login", // Đảm bảo đúng path trang login của bạn
    "/login",
  ];

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 2. Chạy xác thực qua authMiddleware
  // Trả về trực tiếp kết quả (Dù là redirect, json lỗi, hay .next())
  console.log(`middleware đang kiểm tra xác thực cho: ${pathname}`);
  return await authMiddleware(req);
}

export const config = {
  matcher: ["/api/:path*", "/giaodien/:path*"],
};
