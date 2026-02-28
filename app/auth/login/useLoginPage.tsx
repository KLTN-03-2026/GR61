// @/lib/hooks/useLoginPage.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAxios } from "@/lib/hooks/useAxios";
import { VaiTro } from "@prisma/client";

// Định nghĩa kiểu dữ liệu trả về từ API
interface LoginResponse {
  message: string;
  user: {
    id: number;
    hoTen: string;
    email: string;
    vaiTro: VaiTro;
  };
}

export function useLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Sử dụng hook useAxios với kiểu dữ liệu LoginResponse
  const { fetchData, loading } = useAxios<LoginResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      // Gọi API đăng nhập
      const res = await fetchData("POST", "/api/auth/login", formData);

      if (!res) return;

      // Token đã được set tự động vào Cookie từ Server, không cần localStorage
      alert(res.message || "Đăng nhập thành công");

      // Điều hướng dựa trên vai trò trong Prisma 7 (Admin hoặc HocVien)
      const role = res.user.vaiTro;
      if (role === "Admin") {
        router.push("/giaodien/admin");
      } else {
        router.push("/users");
      }
    } catch (err) {
      setError("Email hoặc mật khẩu không chính xác");
    }
  };

  return { formData, error, loading, handleChange, handleSubmit };
}
