"use client";
import React from "react";
import { Cpu } from "lucide-react";
import { useDashboardData } from "./hooks/useDashboardData";
import DashboardHero from "./components/DashboardHero";
import StatGrid from "./components/StatGrid";
import useSWR from "swr"; // Thêm SWR để lấy tên profile

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OverviewPage() {
  const { stats, loading } = useDashboardData();
  const { data: profile } = useSWR("/api/profile", fetcher); // Lấy tên thật

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse uppercase text-xs">
        Đang đồng bộ hệ sinh thái DTU...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 no-scrollbar animate-in fade-in duration-700 h-full">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[450px]">
        {/* HERO SECTION (65%) */}
        <div className="lg:w-[65%] flex">
          <DashboardHero name={profile?.hoTen?.split(" ").pop() || "Dũng"} />
        </div>

        {/* STAT CARDS (35%) */}
        <div className="lg:w-[35%] flex">
          <StatGrid stats={stats} />
        </div>
      </div>

      {/* AI INSIGHTS */}
      <footer className="p-8 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_#000] flex flex-col md:flex-row items-center gap-8">
        <div className="flex items-center gap-4 border-b-2 md:border-b-0 md:border-r-2 border-slate-100 pb-4 md:pb-0 md:pr-8 shrink-0">
          <div className="p-4 bg-green-50 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <Cpu className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic leading-none text-green-600 tracking-tighter">
            AI <br /> Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="italic text-sm font-bold text-green-800 bg-green-50/50 p-5 rounded-2xl border-2 border-dashed border-green-600">
            {stats.todoPending > 0
              ? `${profile?.hoTen?.split(" ").pop()} ơi, còn ${stats.todoPending} nhiệm vụ chưa xong. Cố gắng dứt điểm nhé!`
              : "Tuyệt vời! Dũng đã hoàn thành mọi mục tiêu."}
          </div>
          <div className="italic text-sm font-bold text-slate-500 p-5 border-2 border-dashed border-slate-300 rounded-2xl flex items-center">
            Mẹo: Dành 15 phút Flashcard giúp ghi nhớ kiến thức DTU tốt hơn 40%.
          </div>
        </div>
      </footer>
    </div>
  );
}
