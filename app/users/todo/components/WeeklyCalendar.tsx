"use client";
import React from "react";
import { useTodoStore } from "@/stores/useTodoStore";
import { format, addDays, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeeklyCalendar() {
  const {
    selectedDate,
    currentWeekStart,
    setSelectedDate,
    nextWeek,
    prevWeek,
  } = useTodoStore();

  // Tạo mảng 7 ngày trong tuần
  const days = Array.from({ length: 7 }).map((_, i) =>
    addDays(currentWeekStart, i),
  );

  return (
    <div className="w-72 border-black h-full bg-white flex flex-col p-4 no-scrollbar">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black italic uppercase tracking-tighter font-serif text-black">
          Tuần này
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevWeek}
            className="p-1.5 border-2 border-black rounded-lg hover:bg-slate-50 active:translate-y-0.5 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
          <button
            onClick={nextWeek}
            className="p-1.5 border-2 border-black rounded-lg hover:bg-slate-50 active:translate-y-0.5 transition-all"
          >
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {days.map((day) => {
          const active = isSameDay(day, selectedDate);
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all ${
                active
                  ? "bg-green-500 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                  : "bg-white text-black border-gray-300 border-2 hover:border-black hover:bg-green-100"
              }`}
            >
              {/* THỨ NẰM BÊN TRÁI */}
              <p
                className={`text-[13px] font-black uppercase tracking-widest ${active ? "text-white" : "text-slate-600"}`}
              >
                {format(day, "EEEE", { locale: vi })}
              </p>

              {/* NGÀY NẰM BÊN PHẢI */}
              <div className="flex items-center gap-2">
                <p className="text-sm font-black italic tracking-tight tabular-nums">
                  {format(day, "dd/MM")}
                </p>
                {active && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
