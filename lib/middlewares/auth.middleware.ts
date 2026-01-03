// lib/middlewares/auth.middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyCsrfToken } from "../csrf";
import { VaiTro } from "@prisma/client";

const SECRET = process.env.JWT_SECRET!;

// 1. Định nghĩa Interface khớp chính xác với LOG Payload của bạn
interface UserPayload extends jwt.JwtPayload {
  userId: number; // Đổi từ id thành userId cho khớp với log thực tế
  vaiTro: VaiTro;
  email?: string;
}

export async function authMiddleware(req: NextRequest) {
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
    // 2. Xác thực JWT
    const decoded = jwt.verify(token, SECRET) as UserPayload;

    // Log kiểm tra lần cuối (Dũng xem trong Terminal sẽ thấy userId thay vì id)
    console.log("- Token hợp lệ! Payload:", decoded);

    const role = decoded.vaiTro;
    const pathname = req.nextUrl.pathname;

    // 3. RBAC: Kiểm tra quyền truy cập đường dẫn
    // Chặn nếu vào /admin mà không phải Admin
    if (pathname.startsWith("/giaodien/admin") && role !== VaiTro.Admin) {
      console.log("-> Bị chặn: Không có quyền Admin");
      return NextResponse.redirect(new URL("/giaodien/403", req.url));
    }

    // Chặn nếu vào /hocvien mà vai trò không hợp lệ (HocVien và Admin đều được vào)
    if (
      pathname.startsWith("/giaodien/hocvien") &&
      role !== VaiTro.HocVien &&
      role !== VaiTro.Admin
    ) {
      console.log("-> Bị chặn: Không có quyền HocVien");
      return NextResponse.redirect(new URL("/giaodien/403", req.url));
    }

    // 4. Kiểm tra CSRF cho POST/PUT/DELETE
    const method = req.method.toUpperCase();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const csrfHeader = req.headers.get("x-csrf-token");
      const csrfCookie = req.cookies.get("csrf_token")?.value;

      if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
        return NextResponse.json(
          { error: "CSRF không hợp lệ." },
          { status: 403 }
        );
      }

      const isValid = await verifyCsrfToken(csrfHeader);
      if (!isValid) {
        return NextResponse.json({ error: "CSRF hết hạn." }, { status: 403 });
      }
    }

    // 5. Gắn thông tin vào Header và CHẤP THUẬN cho đi tiếp
    const requestHeaders = new Headers(req.headers);
    // Sử dụng decoded.userId thay vì decoded.id
    requestHeaders.set("x-user-id", decoded.userId.toString());
    requestHeaders.set("x-user-role", decoded.vaiTro);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err: unknown) {
    console.log("- Token lỗi:", err);
    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: "JWT đã hết hạn." }, { status: 401 });
    }
    return NextResponse.json({ error: "JWT không hợp lệ." }, { status: 403 });
  }
}
