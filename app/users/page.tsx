"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckSquare,
  BarChart3,
  Cpu,
  FolderRoot,
  ArrowRight,
} from "lucide-react";
import { useDashboardData } from "./dashboard/hooks/useDashboardData";

export default function OverviewPage() {
  const router = useRouter();
  const { stats, loading } = useDashboardData();

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center font-black italic text-green-600 animate-pulse">
        ĐANG ĐỒNG BỘ DỮ LIỆU...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 no-scrollbar">
      {/* CỘT TRÊN: HERO & STATS DỌC */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* HERO SECTION */}
        <section className="lg:w-[62%] p-8 border-[3px] border-black rounded-[32px] bg-slate-50 flex flex-col justify-center relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-3xl font-black text-black mb-3 uppercase tracking-tighter italic font-serif leading-tight">
            Hệ sinh thái <br />
            <span className="text-green-600 underline decoration-black decoration-2 underline-offset-4">
              Học tập thông minh
            </span>
          </h1>
          <p className="text-sm text-slate-500 font-bold mb-8 italic max-w-md">
            Chào Dũng! DTU 2026 đang đến gần, cùng AI kiểm soát lộ trình hôm nay
            nhé.
          </p>
          <button
            onClick={() => router.push("/users/calendar")}
            className="px-6 py-3 bg-green-600 text-white font-black border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 uppercase text-[10px] italic w-fit"
          >
            Bắt đầu học tập <ArrowRight size={16} strokeWidth={3} />
          </button>
        </section>

        {/* STAT CARDS DỌC */}
        <div className="lg:w-[38%] flex flex-col gap-3">
          <StatCard
            icon={<Calendar size={20} />}
            title="Lịch học"
            desc={`Hôm nay: ${stats.todayEvents} buổi`}
          />
          <StatCard
            icon={<CheckSquare size={20} />}
            title="Nhiệm vụ"
            desc={`${stats.todoDone} xong / ${stats.todoPending} chờ`}
          />
          <StatCard
            icon={<BarChart3 size={20} />}
            title="Hiệu suất"
            desc={`Đạt ${stats.progress}% mục tiêu`}
          />
          <StatCard
            icon={<FolderRoot size={20} />}
            title="Flashcard"
            desc={`${stats.flashcardFolders} thư mục`}
          />
        </div>
      </div>

      {/* FOOTER: AI INSIGHTS */}
      <footer className="p-6 border-[3px] border-black rounded-[28px] bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-3 md:border-r-2 border-slate-100 pr-6 shrink-0">
          <div className="p-2 bg-green-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-green-600">
            <Cpu size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-lg font-black uppercase italic font-serif leading-none">
            AI Insights
          </h2>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50/50 rounded-xl border-2 border-dashed border-green-600 text-[11px] font-bold text-green-800 italic">
            {stats.todoPending > 0
              ? `Dũng còn ${stats.todoPending} việc chưa xong. Cố gắng dứt điểm nhé!`
              : "Mọi việc đã hoàn tất!"}
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-[11px] font-bold text-slate-500 italic">
            Lời khuyên: Dành 15 phút Flashcard giúp ghi nhớ kiến thức DTU tốt
            hơn 40%.
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-4 border-[3px] border-black rounded-[24px] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer">
      <div className="p-2.5 bg-green-50 border-2 border-black rounded-xl text-green-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <div>
        <h3 className="text-[12px] font-black uppercase italic font-serif leading-none">
          {title}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1.5 tracking-tight">
          {desc}
        </p>
      </div>
    </div>
  );
}
