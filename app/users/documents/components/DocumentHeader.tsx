"use client";
import { Plus } from "lucide-react";

interface Props {
  onAddClick: () => void;
}

export function DocumentHeader({ onAddClick }: Props) {
  return (
    <div className="flex justify-between items-center mb-5 rounded-2xl bg-white">
      <div>
        <h1 className="text-5xl font-black text-black uppercase italic font-serif tracking-tighter">
          Kho Tài Liệu <span className="text-green-600">Số</span>
        </h1>
        <p className="text-l font-bold text-slate-400 uppercase italic">
          Đại học Duy Tân - Hệ sinh thái học tập 2026
        </p>
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-green-600 text-white font-black px-6 py-3 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:shadow-none active:translate-y-1 transition-all uppercase italic text-xs"
      >
        <Plus size={20} strokeWidth={3} /> Tải tài liệu mới
      </button>
    </div>
  );
}
