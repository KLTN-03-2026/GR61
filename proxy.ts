import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// XÓA DÒNG IMPORT PRISMA TẠI ĐÂY - ĐÓ LÀ NGUYÊN NHÂN GÂY LỖI FATAL

const SECRET = process.env.JWT_SECRET!;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  // 1. DANH SÁCH ROUTE CÔNG KHAI
  const publicRoutes = [
    "/",
    "/login",
    "/auth",
    "/api/auth", 
    "/api/uploadthing",
  ];

  const isPublic = publicRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // 2. Hàm xử lý lỗi
  const handleAuthError = () => {
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Bạn chưa đăng nhập hoặc phiên làm việc hết hạn." },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/", req.url));
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
    const role = decoded.vaiTro; // Ví dụ: "HocVien" hoặc "Admin"

    // 4. PHÂN QUYỀN (Sử dụng string trực tiếp để tránh kéo Prisma vào)
    
    // Bảo vệ khu vực học viên
    if (pathname.startsWith("/users")) {
      if (role !== "HocVien" && role !== "Admin") {
        return handleAuthError();
      }
    }

    // Bảo vệ khu vực Admin (Trang bạn vừa làm)
    if (pathname.startsWith("/admin")) {
      if (role !== "Admin") {
        // Nếu không phải admin thì đá về trang chủ
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // 5. Gắn thông tin vào Header
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId.toString());
    requestHeaders.set("x-user-role", decoded.vaiTro);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("Lỗi xác thực tại Middleware:", err);
    return handleAuthError();
  }
}

export const config = {
  matcher: [
    "/((?!api/uploadthing|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)).*)",
  ],
};