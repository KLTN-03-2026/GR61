import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { VaiTro } from "@/app/generated/prisma";

const SECRET = process.env.JWT_SECRET!;

// Tên hàm bắt buộc là 'proxy' cho Next.js 16
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  // 1. DANH SÁCH ROUTE CÔNG KHAI
  // Thêm "/" vào đây để trang chủ không bị chặn
  const publicRoutes = [
    "/",
    "/login",
    "/api/auth",
    "/auth",
    "/api/uploadthing",
  ];

  // Kiểm tra quyền truy cập công khai
  const isPublic = publicRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // 2. Hàm xử lý lỗi: API trả về JSON, Giao diện đẩy về Login
  const handleAuthError = () => {
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Bạn chưa đăng nhập hoặc phiên làm việc hết hạn." },
        { status: 401 },
      );
    }
    // Nếu vào trang bảo mật (VD: /users/documents) mà chưa login thì mới đá về /login
    return NextResponse.redirect(new URL("/login", req.url));
  };

  // 3. Lấy và xác thực Token
  const headerToken = req.headers.get("authorization");
  const cookieToken = req.cookies.get("access_token")?.value;
  const token = headerToken?.startsWith("Bearer ")
    ? headerToken.replace("Bearer ", "")
    : cookieToken;

  if (!token) return handleAuthError();

  try {
    const decoded = jwt.verify(token, SECRET) as any;
    const role = decoded.vaiTro;

    // 4. Phân quyền cho khu vực học viên (/users)
    if (
      pathname.startsWith("/users") &&
      role !== VaiTro.HocVien &&
      role !== VaiTro.Admin
    ) {
      return handleAuthError();
    }

    // 5. Gắn User ID vào Header để Backend sử dụng
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId.toString());
    requestHeaders.set("x-user-role", decoded.vaiTro);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("Lỗi xác thực tại Proxy:", err);
    return handleAuthError();
  }
}

export const config = {
  matcher: [
    /*
     * 1. Loại trừ các file hệ thống của Next.js (_next/static, _next/image)
     * 2. Loại trừ các file tĩnh phổ biến (hình ảnh, icon, font)
     * 3. Loại trừ endpoint của Uploadthing
     */
    "/((?!api/uploadthing|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)).*)",
  ],
};
