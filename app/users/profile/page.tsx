"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Save,
  Loader2,
  Camera,
  Edit3,
} from "lucide-react";
import { format } from "date-fns";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function calculateAge(birthDateString: string | null | undefined): string {
  if (!birthDateString) return "---";
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age.toString();
}

export default function ProfilePage() {
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR("/api/user/profile", fetcher);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: "",
  });

  useEffect(() => {
    if (user && !user.error) {
      setFormData({
        hoTen: user.hoTen || "",
        email: user.email || "",
        sdt: user.sdt || "",
        ngaySinh: user.ngaySinh
          ? format(new Date(user.ngaySinh), "yyyy-MM-dd")
          : "",
      });
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.put("/api/user/profile", formData);
      await mutate();
      alert("Đã cập nhật hồ sơ thành công! ");
    } catch (error) {
      alert("Lỗi cập nhật hồ sơ!");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="h-full flex items-center justify-center font-black italic text-green-600 animate-pulse text-2xl uppercase">
        Hệ thống đang quét dữ liệu...
      </div>
    );
  }

  const hoTenDisplay = formData.hoTen || user?.hoTen || "Người dùng Duy Tân";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(hoTenDisplay)}&background=fff&color=16a34a&bold=true&size=256&border=true`;
  const age = calculateAge(user?.ngaySinh);

  return (
    <div className="flex flex-col h-full p-4 lg:p-6 animate-in fade-in duration-500 space-y-4 overflow-hidden">
      <header className=" pb-3 flex-shrink-0">
        <h1 className=" flex justify-center text-6xl font-black uppercase italic tracking-tighter text-black flex items-center gap-2">
          Thông tin cá nhân
        </h1>
      </header>

      {/* 2. GRID LAYOUT - CHIỀU CAO CỐ ĐỊNH THEO MÀN HÌNH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-0 flex-grow">
        {/* CỘT TRÁI: ID CARD */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-white border-4 border-black h-full rounded-[32px] shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col relative">
            <div className="bg-green-600 h-20 border-b-4 border-black flex items-center justify-center relative flex-shrink-0">
              <div className="mt-2 absolute top-1 right-3 text-white/30 font-black italic text-3xl select-none tracking-tighter">
                {" "}
                Cố lên nhé!
              </div>
              <div
                className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1.5px 1.5px, black 1px, transparent 0)",
                  backgroundSize: "18px 18px",
                }}
              ></div>
            </div>

            <div className="px-6 flex flex-col items-center justify-center -mt-10 relative z-10 h-0 flex-grow">
              <div className="relative group">
                <img
                  src={avatarUrl}
                  className="w-40 h-40 rounded-3xl border-4 border-black bg-white shadow-[10px_10px_0px_0px_#000] object-cover transition-all"
                  alt="Avatar"
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 p-2.5 bg-yellow-400 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:translate-y-0.5 transition-all"
                >
                  <Camera size={16} strokeWidth={3} />
                </button>
              </div>

              <h2 className="mt-6 text-2xl font-black uppercase italic text-center leading-tight text-black truncate w-full px-4">
                {hoTenDisplay}
              </h2>

              <div className="mt-3 flex gap-2">
                <span className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase italic rounded-full shadow-[2px_2px_0px_0px_#16a34a]">
                  ID: {user?.id || "N/A"}
                </span>
                <span className="px-3 py-1 bg-green-200 text-black text-[9px] font-black uppercase italic rounded-full shadow-[2px_2px_0px_0px_#000]">
                  ROLE: {user?.vaiTro}
                </span>
              </div>
            </div>

            <div className="border-t-4 border-black h-10 bg-slate-50 flex items-center justify-center flex-shrink-0">
              <p className="text-[10px] font-black italic text-slate-300 uppercase">
                DTU Personalize system v1.0
              </p>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: FORM CHỈNH SỬA */}
        <form
          onSubmit={handleUpdate}
          className="lg:col-span-7 h-full bg-white border-4 border-black rounded-[32px] shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 h-0 flex-grow overflow-y-auto pr-1 no-scrollbar">
            {/* Field: Họ Tên */}
            <div className="space-y-1.5 p-3 border-2 border-black rounded-xl bg-green-50 shadow-[3px_3px_0px_0px_#000]">
              <label className="text-[10px] font-black uppercase italic flex items-center gap-1.5 text-green-700">
                <User size={13} strokeWidth={2.5} /> Họ và tên đầy đủ
              </label>
              <input
                type="text"
                value={formData.hoTen}
                onChange={(e) =>
                  setFormData({ ...formData, hoTen: e.target.value })
                }
                className="w-full p-2.5 border-2 border-black rounded-xl bg-white font-bold italic shadow-[1.5px_1.5px_0px_0px_#000] focus:outline-none"
                placeholder="Nhập tên..."
                required
              />
            </div>

            {/* Field: Vai trò */}
            <div className="space-y-1.5 p-3 border-2 border-black rounded-xl bg-blue-50 shadow-[3px_3px_0px_0px_#000] opacity-80">
              <label className="text-[10px] font-black uppercase italic flex items-center gap-1.5 text-blue-700">
                <Shield size={13} strokeWidth={2.5} /> Chức danh
              </label>
              <input
                disabled
                value={`${user?.vaiTro || "HỌC VIÊN"} @ DTU`}
                className="w-full p-2.5 border-2 border-slate-200 text-slate-400 bg-slate-100 rounded-xl font-bold italic cursor-not-allowed"
              />
            </div>

            {/* Field: Email */}
            <div className="space-y-1.5 p-3 border-2 border-black rounded-xl bg-red-50 shadow-[3px_3px_0px_0px_#000]">
              <label className="text-[10px] font-black uppercase italic flex items-center gap-1.5 text-red-700">
                <Mail size={13} strokeWidth={2.5} /> Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2.5 border-2 border-black rounded-xl bg-white font-bold italic shadow-[1.5px_1.5px_0px_0px_#000] focus:outline-none"
                placeholder="email@duytan.edu.vn"
              />
            </div>

            {/* Field: SĐT */}
            <div className="space-y-1.5 p-3 border-2 border-black rounded-xl bg-orange-50 shadow-[3px_3px_0px_0px_#000]">
              <label className="text-[10px] font-black uppercase italic flex items-center gap-1.5 text-orange-700">
                <Phone size={13} strokeWidth={2.5} /> Số điện thoại
              </label>
              <input
                type="text"
                value={formData.sdt}
                onChange={(e) =>
                  setFormData({ ...formData, sdt: e.target.value })
                }
                className="w-full p-2.5 border-2 border-black rounded-xl bg-white font-bold italic shadow-[1.5px_1.5px_0px_0px_#000] focus:outline-none"
                placeholder="09xxx..."
              />
            </div>

            <div className="space-y-1.5 md:col-span-2 p-3 border-2 border-black rounded-xl bg-purple-50 shadow-[3px_3px_0px_0px_#000]">
              <label className="text-[10px] font-black uppercase italic flex items-center gap-1.5 text-purple-700">
                <Calendar size={13} strokeWidth={2.5} /> Ngày sinh (
                {age !== "---" ? `${age} tuổi` : "Chưa cập nhật"})
              </label>
              <input
                type="date"
                value={formData.ngaySinh}
                onChange={(e) =>
                  setFormData({ ...formData, ngaySinh: e.target.value })
                }
                className="w-full p-2.5 border-2 border-black rounded-xl bg-white font-bold italic shadow-[1.5px_1.5px_0px_0px_#000] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-row justify-between items-center gap-4 mt-auto flex-shrink-0">
            <div className="text-[8px] font-black uppercase italic text-slate-400">
              Cập nhật lần cuối:{" "}
              {user?.ngayCapNhat
                ? format(new Date(user.ngayCapNhat), "dd/MM/yyyy HH:mm")
                : "N/A"}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-green-600 text-white font-black uppercase italic border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} strokeWidth={2.5} />
              )}
              <span>Lưu hồ sơ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
