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
import { useDashboardData } from "./hooks/useDashboardData";

export default function OverviewPage() {
  const router = useRouter();
  const stats = useDashboardData();

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 no-scrollbar">
      {/* PHẦN THÂN TRÊN: CHIA 2 CỘT */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* BÊN TRÁI: HERO SECTION (60%) */}
        <section className="lg:w-[65%] p-12 border-[3px] border-black rounded-[40px] bg-slate-50 flex flex-col justify-center relative overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <div className="relative z-10">
            <h1 className="text-5xl font-black text-black mb-6 uppercase tracking-tighter italic font-serif leading-tight">
              Hệ sinh thái <br />
              <span className="text-green-600">Học tập thông minh</span>
            </h1>
            <p className="text-xl text-slate-600 font-bold mb-10 italic max-w-lg">
              Chào Dũng! DTU 2026 đang đến gần, hãy cùng trợ lý AI kiểm soát lộ
              trình hôm nay nhé.
            </p>
            <button
              onClick={() => router.push("/users/calendar")}
              className="px-8 py-4 bg-green-600 text-white font-black border-2 border-black rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:shadow-none active:translate-y-1 transition-all flex items-center gap-3 uppercase text-sm italic w-fit"
            >
              Bắt đầu phiên học <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
          {/* Trang trí góc */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50"></div>
        </section>

        {/* BÊN PHẢI: 4 STAT CARDS DỌC (35%) */}
        <div className="lg:w-[35%] flex flex-col gap-5">
          <StatCard
            icon={<Calendar size={22} />}
            title="Lịch học"
            desc={`Hôm nay: ${stats.todayEvents} buổi`}
          />
          <StatCard
            icon={<CheckSquare size={22} />}
            title="Nhiệm vụ"
            desc={`${stats.todoDone} xong / ${stats.todoPending} chờ`}
          />
          <StatCard
            icon={<BarChart3 size={22} />}
            title="Hiệu suất"
            desc={`Đạt ${stats.progress}% mục tiêu`}
          />
          <StatCard
            icon={<FolderRoot size={22} />}
            title="Flashcard"
            desc={`${stats.flashcardFolders} thư mục thẻ`}
          />
        </div>
      </div>

      {/* PHẦN DƯỚI: AI INSIGHTS (DẠNG FOOTER) */}
      <footer className="p-8 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8">
        <div className="flex items-center gap-4 border-b-2 md:border-b-0 md:border-r-2 border-slate-100 pb-4 md:pb-0 md:pr-8 shrink-0">
          <div className="p-3 bg-green-50 rounded-2xl border-2 border-black">
            <Cpu className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic font-serif leading-none text-green-600">
            AI <br /> Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="italic text-sm font-bold text-green-800 bg-green-50/50 p-4 rounded-2xl border-2 border-dashed border-green-600">
            {stats.todoPending > 0
              ? `Dũng ơi, bạn còn ${stats.todoPending} nhiệm vụ chưa xong. Hãy tập trung dứt điểm nhé!`
              : "Thật tuyệt! Dũng đã hoàn thành mọi mục tiêu đề ra. Hãy nghỉ ngơi một chút nhé."}
          </div>
          <div className="italic text-sm font-bold text-slate-500 p-4 border-2 border-dashed border-slate-300 rounded-2xl">
            Lời khuyên: Dành 30 phút buổi tối để ôn tập Flashcard giúp ghi nhớ
            kiến thức DTU tốt hơn 40%.
          </div>
        </div>
      </footer>
    </div>
  );
}

// COMPONENT CARD DỌC
function StatCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex-1 p-5 border-[3px] border-black rounded-[24px] bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer flex items-center gap-5">
      <div className="p-3 bg-green-50 border-2 border-black rounded-xl text-green-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <div>
        <h3 className="text-md font-black uppercase italic font-serif text-black leading-none">
          {title}
        </h3>
        <p className="text-[11px] font-bold text-slate-400 uppercase mt-2 tracking-wider">
          {desc}
        </p>
      </div>
    </div>
  );
}
