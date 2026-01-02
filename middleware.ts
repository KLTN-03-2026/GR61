import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/middlewares/auth.middleware";
export const runtime = "nodejs";
/**
 * Middleware trung tâm:
 * - Bảo vệ toàn bộ API (trừ các route công khai)
 * - Kiểm tra JWT
 * - Kiểm tra CSRF token (cho các phương thức ghi)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //Các route công khai — không yêu cầu đăng nhập
  const publicRoutes = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/csrf",
    "/api/auth/refresh",
    "/login",
  ];

  // Nếu là route công khai → bỏ qua middleware
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ngược lại - > yêu cầu xác thực JWT + CSRF
  console.log(`middleware đăng kiểm tra xác thực cho: ${pathname}`);
  const res = await authMiddleware(req);

  // nếu middleware con trả về lỗi
  if (res instanceof NextResponse && res.status !== 200) {
    console.log(`request bị chặn ở middleware: ${pathname}`);
    return res;
  }
  // Còn lại: yêu cầu xác thực và CSRF
  return NextResponse.next();
}

/**
 * Cấu hình route matcher
 *  → Áp dụng cho tất cả các API routes (/api/**)
 */
export const config = {
  matcher: ["/api/:path*", "/giaodien/:path*"],
};
