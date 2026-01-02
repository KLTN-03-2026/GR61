import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

//  Tạo token ngẫu nhiên
function createCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

//  API cấp CSRF Token và lưu vào cookie
export async function GET() {
  const token = createCsrfToken();
  const cookieStore = await cookies();

  cookieStore.set("csrf_token", token, {
    httpOnly: true, // tránh XSS
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    sameSite: "strict", // chống CSRF từ domain khác
    path: "/",
  });

  return NextResponse.json({ csrfToken: token });
}
