"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlashcardHistory } from "../hooks/useFlashcardHistory";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  BarChart3,
  ListChecks,
} from "lucide-react";

export default function FlashcardHistoryPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [viewMode, setViewMode] = useState<"score" | "count">("score");
  const { history, chartData, isLoading } = useFlashcardHistory(timeRange);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse">
        ĐANG TẢI...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen text-slate-900 no-scrollbar">
      <header className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 pb-5">
        <button
          onClick={() => router.back()}
          className="p-2 border-2 border-black rounded-xl shadow-sm"
        >
          <ArrowLeft size={18} strokeWidth={3} />
        </button>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
          Lịch sử rèn luyện
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mb-12 ">
        <aside className="lg:w-1/4 space-y-4">
          <FilterSection title="Phạm vi" icon={<Calendar size={12} />}>
            {["week", "month", "year"].map((t: any) => (
              <FilterBtn
                key={t}
                active={timeRange === t}
                onClick={() => setTimeRange(t)}
                label={
                  t === "week"
                    ? "Tuần này"
                    : t === "month"
                      ? "Tháng này"
                      : "Năm nay"
                }
              />
            ))}
          </FilterSection>
          <FilterSection title="Chế độ" icon={<BarChart3 size={12} />}>
            <FilterBtn
              active={viewMode === "score"}
              onClick={() => setViewMode("score")}
              label="Điểm trung bình"
            />
            <FilterBtn
              active={viewMode === "count"}
              onClick={() => setViewMode("count")}
              label="Số lượng bài"
            />
          </FilterSection>
        </aside>

        <main className="lg:w-3/4 p-6 border-2 border-slate-300 rounded-[32px] shadow-xl h-[380px] bg-white">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "score" ? (
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: 900 }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: 900 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "2px solid #16a34a",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#16a34a"
                  strokeWidth={3}
                  fill="#16a34a"
                  fillOpacity={0.1}
                />
              </AreaChart>
            ) : (
              <BarChart data={chartData}>
                {/* Đã thêm đầy đủ trục và Tooltip cho BarChart */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: 900 }}
                />
                <YAxis
                  allowDecimals={false} // Số bài thì không được có số thập phân
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: 900 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }} // Màu nền nhạt khi hover vào cột
                  contentStyle={{
                    borderRadius: "12px",
                    border: "2px solid #16a34a",
                  }}
                />
                <Bar dataKey="count" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </main>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-black uppercase italic border-b-2 border-slate-100 pb-2 flex items-center gap-2">
          <ListChecks size={20} className="text-green-600" /> Danh sách bài thi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history?.map((item: any) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-components để code gọn hơn
function FilterSection({ title, icon, children }: any) {
  return (
    <div className="p-5 border-2 border-slate-300 rounded-[24px] shadow-xl bg-white">
      <p className="text-[10px] font-black uppercase text-green-600 mb-4 flex items-center gap-2">
        {icon} {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FilterBtn({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase italic transition-all border-2 border-black ${active ? `bg-green-600 text-white shadow-none translate-y-0.5` : "bg-white text-black shadow-md hover:bg-green-50"}`}
    >
      {label}
    </button>
  );
}

function HistoryCard({ item }: any) {
  return (
    <div className="p-5 border-slate-400 rounded-[24px] shadow-xl bg-white group hover:translate-y-[-4px] transition-all border-2">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-black uppercase italic group-hover:text-green-600 transition-colors">
          {item.folder.name}
        </h4>
        <span className="text-[10px] font-bold text-slate-400">
          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
        </span>
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-slate-50">
        <div className="flex gap-4 text-[10px] font-black text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen size={12} className="text-green-600" />{" "}
            {item.correctAnswers}/{item.totalQuestions}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-green-600" />{" "}
            {Math.floor(item.timeSpent / 60)}:
            {(item.timeSpent % 60).toString().padStart(2, "0")}
          </span>
        </div>
        <div className="bg-green-600 text-white px-3 py-1 rounded-lg font-black text-xs shadow-md">
          {item.score.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
