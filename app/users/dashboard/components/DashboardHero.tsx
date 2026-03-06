"use client";
import { ArrowRight } from "lucide-react";

export default function DashboardHero({ name }: { name: string }) {
  return (
    <section className="p-10 border-2 border-black rounded-[32px] bg-slate-50 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-2xl relative z-10">
        <h1 className="text-4xl font-black text-black mb-4 uppercase tracking-tighter italic font-serif">
          Hệ sinh thái{" "}
          <span className="text-green-600">Học tập thông minh</span>
        </h1>
        <p className="text-lg text-slate-600 font-bold mb-8 italic">
          Chào {name}! Mục tiêu tốt nghiệp 2026 đang rất gần, hãy cùng AI tối ưu
          hóa lộ trình hôm nay nhé.
        </p>
        <button className="px-6 py-3 bg-green-600 text-white font-black border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 uppercase text-xs italic">
          Vào phòng học tập <ArrowRight size={18} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
}
