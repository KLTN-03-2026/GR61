import { NextResponse } from "next/server";
// xóa cookie
export async function POST() {
  const res = NextResponse.json({ message: "Đăng xuất thành công" });
  res.cookies.delete("access_token");
  res.cookies.delete("refresh_token");
  res.cookies.delete("csrf_token");
  return res;
}
