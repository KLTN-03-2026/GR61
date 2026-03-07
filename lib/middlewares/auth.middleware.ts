import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { VaiTro } from "@/app/generated/prisma";

const SECRET = process.env.JWT_SECRET!;

interface UserPayload extends jwt.JwtPayload {
  userId: number;
  vaiTro: VaiTro;
  email?: string;
}

export async function authMiddleware(req: NextRequest) {
  const headerToken = req.headers.get("authorization");
  const cookieToken = req.cookies.get("access_token")?.value;

  const token = headerToken?.startsWith("Bearer ")
    ? headerToken.replace("Bearer ", "")
    : cookieToken;

  // 1. Kiểm tra Token
  if (!token) {
    return NextResponse.json(
      { error: "Bạn chưa đăng nhập hoặc phiên làm việc hết hạn." },
      { status: 401 },
    );
  }

  try {
    // 2. Giải mã JWT
    const decoded = jwt.verify(token, SECRET) as UserPayload;
    console.log("- Xác thực thành công cho User ID:", decoded.userId);

    const role = decoded.vaiTro;
    const pathname = req.nextUrl.pathname;

    // 3. Phân quyền truy cập (RBAC)
    // Chặn Admin: Nếu vào /admin mà không có quyền
    if (pathname.startsWith("/admin") && role !== VaiTro.Admin) {
      return NextResponse.json(
        { error: "Quyền truy cập bị từ chối." },
        { status: 403 },
      );
    }

    // Chặn User: Bảo vệ các route liên quan đến Todo/Calendar
    if (
      (pathname.startsWith("/users/calendar") ||
        pathname.startsWith("/users/todo")) &&
      role !== VaiTro.HocVien &&
      role !== VaiTro.Admin
    ) {
      return NextResponse.json(
        { error: "Bạn không có quyền truy cập khu vực này." },
        { status: 403 },
      );
    }

    // 4. CHỐT HẠ: Truyền userId vào Header để API Route sử dụng
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId.toString());
    requestHeaders.set("x-user-role", decoded.vaiTro);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err: unknown) {
    console.error("- Lỗi Token:", err);
    return NextResponse.json(
      { error: "Xác thực không hợp lệ." },
      { status: 401 },
    );
  }
}
