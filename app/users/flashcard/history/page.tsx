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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse text-xs uppercase tracking-widest">
        Đang tải báo cáo...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen text-slate-900 no-scrollbar">
      {/* HEADER TỐI GIẢN */}
      <header className="flex justify-between items-center mb-8 border-b-2 border-slate-100 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 border-2 border-black rounded-xl hover:bg-slate-50 shadow-sm transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Lịch sử rèn luyện
          </h1>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* SIDEBAR XANH LÁ */}
        <aside className="lg:w-1/4 space-y-4">
          <div className="p-5 border-2 border-slate-100 rounded-[24px] shadow-xl bg-white">
            <p className="text-[10px] font-black uppercase text-green-600 mb-4 flex items-center gap-2">
              <Calendar size={12} /> Phạm vi
            </p>
            <div className="flex flex-col gap-2">
              <FilterBtn
                active={timeRange === "week"}
                onClick={() => setTimeRange("week")}
                label="Tuần hiện tại"
              />
              <FilterBtn
                active={timeRange === "month"}
                onClick={() => setTimeRange("month")}
                label="Tháng hiện tại"
              />
              <FilterBtn
                active={timeRange === "year"}
                onClick={() => setTimeRange("year")}
                label="Năm hiện tại"
              />
            </div>
          </div>
          <div className="p-5 border-2 border-slate-100 rounded-[24px] shadow-xl bg-white">
            <p className="text-[10px] font-black uppercase text-green-600 mb-4 flex items-center gap-2">
              <BarChart3 size={12} /> Chế độ xem
            </p>
            <div className="flex flex-col gap-2">
              <FilterBtn
                active={viewMode === "score"}
                onClick={() => setViewMode("score")}
                label="Điểm trung bình"
              />
              <FilterBtn
                active={viewMode === "count"}
                onClick={() => setViewMode("count")}
                label="Số lượng bài làm"
              />
            </div>
          </div>
        </aside>

        {/* BIỂU ĐỒ XANH LÁ */}
        <main className="lg:w-3/4 p-6 border-2 border-slate-50 rounded-[32px] shadow-xl h-[380px] bg-white">
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
                    fontWeight: "900",
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
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: 900 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "2px solid #16a34a",
                    fontWeight: "900",
                  }}
                />
                <Bar dataKey="count" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </main>
      </div>

      {/* DANH SÁCH BÀI THI */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b-2 border-slate-100 pb-2">
          <ListChecks size={20} className="text-green-600" />
          <h3 className="text-lg font-black uppercase italic tracking-tighter">
            Danh sách các bài thi đã thực hiện
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history?.map((item: any) => (
            <div
              key={item.id}
              className="p-5 border-2 border-slate-50 rounded-[24px] shadow-xl bg-white hover:translate-y-[-4px] transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-black uppercase italic text-slate-900 group-hover:text-green-600 transition-colors">
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
                    {formatTime(item.timeSpent)}
                  </span>
                </div>
                <div className="bg-green-600 text-white px-3 py-1 rounded-lg font-black text-xs shadow-md">
                  {item.score.toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
