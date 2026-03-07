"use client";
import React from "react";
import { Cpu, ArrowRight } from "lucide-react";
import { useDashboardData } from "./hooks/useDashboardData";
import DashboardHero from "./components/DashboardHero";
import StatGrid from "./components/StatGrid";

export default function OverviewPage() {
  // QUAN TRỌNG: Phải dùng { stats, loading } để lấy đúng dữ liệu từ Hook
  const { stats, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse uppercase text-xs">
        Đang đồng bộ hệ sinh thái DTU...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 no-scrollbar animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* HERO SECTION (65%) */}
        <div className="lg:w-[65%]">
          <DashboardHero name="Dũng" />
        </div>

        {/* STAT CARDS (35%) */}
        <div className="lg:w-[35%]">
          <StatGrid stats={stats} />
        </div>
      </div>

      {/* AI INSIGHTS */}
      <footer className="p-8 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_#000] flex flex-col md:flex-row items-center gap-8">
        <div className="flex items-center gap-4 border-b-2 md:border-b-0 md:border-r-2 border-slate-100 pb-4 md:pb-0 md:pr-8 shrink-0">
          <div className="p-3 bg-green-50 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            <Cpu className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic leading-none text-green-600">
            AI <br /> Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="italic text-sm font-bold text-green-800 bg-green-50/50 p-4 rounded-2xl border-2 border-dashed border-green-600">
            {stats.todoPending > 0
              ? `Dũng ơi, còn ${stats.todoPending} nhiệm vụ chưa xong. Cố gắng dứt điểm nhé!`
              : "Tuyệt vời! Bạn đã hoàn thành mọi mục tiêu."}
          </div>
          <div className="italic text-sm font-bold text-slate-500 p-4 border-2 border-dashed border-slate-300 rounded-2xl">
            Lời khuyên: Ôn tập Flashcard mỗi tối giúp nhớ kiến thức DTU tốt hơn
            40%.
          </div>
        </div>
      </footer>
    </div>
  );
}
