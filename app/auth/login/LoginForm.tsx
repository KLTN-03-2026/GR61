"use client";
import React from "react";

interface Props {
  formData: { email: string; password: string };
  error: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  formData,
  error,
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <img
        src="/anh2.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full opacity-95">
        <div className="bg-[rgb(18,71,105)] bg-opacity-80 p-10 rounded-lg w-[400px] shadow-xl">
          <h1 className="text-4xl font-bold text-[rgb(255,255,255)] mb-8 text-center">
            Đăng nhập
          </h1>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-red-700 text-center text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
              className="p-4 rounded bg-[rgb(150,200,241)] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(255,255,255)]"
            />

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={onChange}
              placeholder="Mật khẩu"
              className="p-4 rounded bg-[rgb(150,200,241)] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(255,255,255)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[rgb(24,71,171)] hover:bg-[rgb(42,95,208)] text-white font-semibold py-3 rounded disabled:opacity-50 transition-colors"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-8 text-[rgb(255,255,255)] text-center text-sm">
            Chưa có tài khoản?{" "}
            <a
              className="text-[rgb(255,255,255)] ml-3 font-bold hover:underline"
              href="/auth/register"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
