"use client";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Có lỗi xảy ra");

      setMessage("Hệ thống đã gửi link đặt lại mật khẩu vào Email của bạn.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Background giữ nguyên như trang Login */}
      <img
        src="/anh2.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full opacity-95">
        <div className="bg-[rgb(18,71,105)] bg-opacity-80 p-10 rounded-lg w-[400px] shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Quên mật khẩu
          </h1>
          <p className="text-gray-200 text-sm mb-8 text-center">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
          </p>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-red-200 text-center text-sm font-medium">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded mb-4 text-green-200 text-center text-sm font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập Email của bạn"
              className="p-4 rounded bg-[rgb(150,200,241)] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[rgb(24,71,171)] hover:bg-[rgb(42,95,208)] text-white font-semibold py-3 rounded disabled:opacity-50 transition-colors"
            >
              {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/auth/login"
              className="text-white text-sm font-bold hover:underline"
            >
              Quay lại đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}