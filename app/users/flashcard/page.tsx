"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { Plus, Folder, History, ArrowRight, X } from "lucide-react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function FlashcardHub() {
  const router = useRouter();
  const { data: folders, mutate } = useSWR("/api/flashcard/folder", fetcher);

  // 1. Quản lý trạng thái Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setIsSubmitting(true);
    try {
      // Gọi API tạo thư mục (flashcardfolder viết thường theo Schema)
      await axios.post("/api/flashcard/folder", { name: newFolderName });
      setNewFolderName("");
      setIsModalOpen(false);
      mutate(); // Cập nhật lại danh sách ngay lập tức
    } catch (error) {
      console.error("Lỗi tạo thư mục:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen no-scrollbar relative">
      {/* HEADER */}
      <header className="flex justify-between items-end border-b-2 border-slate-100 pb-5 mb-8">
        <div>
          <p className="text-green-600 font-black uppercase text-[20px] tracking-widest mb-1">
            Ecosystem
          </p>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
            Thư viện thẻ
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/users/flashcard/history")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-[10px] hover:bg-green-700 transition-all uppercase italic"
          >
            <History size={20} strokeWidth={3} /> Lịch sử
          </button>

          <button
            onClick={() => setIsModalOpen(true)} // Mở Modal thay vì prompt
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-[10px] hover:bg-green-700 transition-all uppercase italic"
          >
            <Plus size={20} strokeWidth={3} /> Tạo thư mục
          </button>
        </div>
      </header>

      {/* GRID THƯ MỤC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {folders?.map((f: any) => (
          <div
            key={f.id}
            onClick={() => router.push(`/users/flashcard/${f.id}`)}
            className="group flex items-center gap-4 p-4 border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-green-50/50 cursor-pointer transition-all relative overflow-hidden"
          >
            <div className="shrink-0 w-12 h-12 bg-green-50 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Folder size={22} className="text-green-600" strokeWidth={3} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black italic uppercase tracking-tighter truncate">
                {f.name}
              </h3>
              <p className="font-bold text-slate-400 text-[9px] uppercase tracking-wider mt-1">
                {f._count?.flashcards || 0} Thẻ ghi nhớ
              </p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
              <ArrowRight size={14} className="text-black" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      {/* 2. MODAL TẠO THƯ MỤC CỰC CHẤT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-[3px] border-black rounded-[32px] p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full max-w-md relative animate-in zoom-in-95 duration-200">
            {/* Nút đóng */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1 border-2 border-black rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={16} strokeWidth={3} />
            </button>

            <div className="mb-6">
              <p className="text-green-600 font-black uppercase text-[10px] tracking-[0.2em] mb-1">
                New Collection
              </p>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                Tạo thư mục
              </h2>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">
                  Tên thư mục của Dũng
                </label>
                <input
                  autoFocus
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Ví dụ: Từ vựng IELTS..."
                  className="w-full p-4 border-2 border-black rounded-2xl font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-600/20 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border-2 border-black rounded-xl font-black text-[11px] uppercase italic hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  disabled={isSubmitting || !newFolderName.trim()}
                  type="submit"
                  className="flex-1 py-3 bg-green-600 text-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-[11px] uppercase italic hover:bg-green-700 disabled:opacity-50 disabled:shadow-none active:translate-y-1 transition-all"
                >
                  {isSubmitting ? "Đang lưu..." : "Xác nhận"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
