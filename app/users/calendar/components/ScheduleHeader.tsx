"use client";
import React from "react";
import { Tag } from "lucide-react";

export default function ScheduleHeader({
  onOpenCate,
}: {
  onOpenCate: () => void;
}) {
  return (
    <header className="flex justify-between items-end border-b-2 border-slate-100 pb-6 mb-8">
      <div>
        <p className="text-green-600 font-black uppercase text-[10px] tracking-widest mb-1">
          Ecosystem
        </p>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
          Thời gian biểu
        </h1>
      </div>
      <button
        onClick={onOpenCate}
        className="bg-white border-2 border-black px-5 py-2.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs flex items-center gap-2 hover:bg-slate-50 transition-all uppercase"
      >
        <Tag size={16} /> Thể loại
      </button>
    </header>
  );
}
