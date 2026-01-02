import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyCsrfToken } from "../csrf";
import { VaiTro } from "@prisma/client";

const SECRET = process.env.JWT_SECRET!;

// 1. Định nghĩa Interface cho JWT Payload
interface UserPayload extends jwt.JwtPayload {
  id: number;
  vaiTro: VaiTro;
  email?: string;
}

export async function authMiddleware(
  req: NextRequest,
  allowedRoles?: VaiTro[]
) {
  console.log("- Bắt đầu xác thực...");

  const headerToken = req.headers.get("authorization");
  const cookieToken = req.cookies.get("access_token")?.value;

  const token = headerToken?.startsWith("Bearer ")
    ? headerToken.replace("Bearer ", "")
    : cookieToken;

  if (!token) {
    return NextResponse.json(
      { error: "Thiếu token hoặc chưa đăng nhập." },
      { status: 401 }
    );
  }

  try {
    // 2. Xác thực JWT với kiểu dữ liệu UserPayload
    const decoded = jwt.verify(token, SECRET) as UserPayload;

    console.log("- Token hợp lệ! Payload:", decoded);

    const role = decoded.vaiTro;
    const pathname = req.nextUrl.pathname;

    // 3. RBAC: Kiểm tra vai trò dựa trên Enum VaiTro từ Prisma
    if (pathname.startsWith("/giaodien/admin") && role !== VaiTro.Admin) {
      return NextResponse.redirect(new URL("/giaodien/403", req.url));
    }

    if (
      pathname.startsWith("/giaodien/tochuc") &&
      !["Admin", "ToChuc"].includes(role)
    ) {
      return NextResponse.redirect(new URL("/giaodien/403", req.url));
    }

    // 4. Kiểm tra CSRF cho các phương thức ghi
    const method = req.method.toUpperCase();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const csrfHeader = req.headers.get("x-csrf-token");
      const csrfCookie = req.cookies.get("csrf_token")?.value;

      if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
        return NextResponse.json(
          { error: "CSRF token không hợp lệ." },
          { status: 403 }
        );
      }

      const isValid = await verifyCsrfToken(csrfHeader);
      if (!isValid) {
        return NextResponse.json(
          { error: "CSRF token hết hạn." },
          { status: 403 }
        );
      }
    }

    // 5. Lưu thông tin user vào Header để Route Handler phía sau có thể lấy được
    // (Next.js Middleware không cho phép gắn trực tiếp vào req object như Express)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id.toString());
    requestHeaders.set("x-user-role", decoded.vaiTro);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err: unknown) {
    // 6. Xử lý lỗi mà không dùng 'any'
    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: "JWT đã hết hạn." }, { status: 401 });
    }
    return NextResponse.json({ error: "JWT không hợp lệ." }, { status: 403 });
  }
}
