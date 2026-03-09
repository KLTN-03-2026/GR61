"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAxios } from "@/lib/hooks/useAxios";

export function useRegister() {
  const router = useRouter();
  const { fetchData, loading } = useAxios<any>();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Spread operator để giữ lại các giá trị cũ
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.hoTen || !formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    try {
      // Chuẩn hóa dữ liệu trước khi gửi để khớp với Zod Schema
      const payload = {
        hoTen: formData.hoTen,
        email: formData.email,
        sdt: formData.sdt || null,
        ngaySinh: formData.ngaySinh || null,
        password: formData.password,
        vaiTro: "HocVien",
      };

      await fetchData("POST", "/api/auth/register", payload);
      alert("Đăng ký thành công!");
      router.push("/auth/login");
    } catch (err: any) {
      setError("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
    }
  };

  return { formData, error, loading, handleChange, handleSubmit };
}
