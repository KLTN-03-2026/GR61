// import crypto from "crypto";
import { cookies } from "next/headers";
// quản lý CSRF token
export function createCsrfToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  // chuyển thành chuỗi hex
  // Uint8Array(32)	Tạo 32 byte ngẫu nhiên
  // getRandomValues()	Sinh giá trị ngẫu nhiên an toàn
  // b.toString(16)	Chuyển mỗi byte sang dạng hex
  // .padStart(2, "0")	Giữ đúng 2 ký tự cho mỗi byte
  // .join("")	Gộp thành 1 chuỗi token
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}
// lưu token vào cookie
export async function setCsrfCookie() {
  const token = createCsrfToken();
  const cookieStore = await cookies(); // cần await
  cookieStore.set("csrf_token", token, {
    httpOnly: false,
    // false vì cần client đọc đưuọc để gửi lên header
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
}

export async function verifyCsrfToken(clientToken: string | null) {
  if (!clientToken) return false;
  // vì cookies là async function nên cần await
  const cookieStore = await cookies(); // cần await
  const cookieToken = cookieStore.get("csrf_token")?.value ?? null;
  if (!cookieToken) return false;

  //  Sửa lại so sánh sai logic của bạn
  return cookieToken === clientToken;
}
