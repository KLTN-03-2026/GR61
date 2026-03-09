"use client";
import React from "react";
import { Bell, User, Search, Menu } from "lucide-react";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Header({ isCollapsed, setIsCollapsed }: HeaderProps) {
  return (
    <header className="h-16 bg-white   flex items-center justify-between px-6 z-30 relative shadow-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 border-2 border-black rounded-lg hover:bg-slate-50 transition-all active:shadow-none"
        >
          <Menu size={15} strokeWidth={2.5} />
        </button>
        <div className="flex flex-col">
          <span className="text-lg font-black italic tracking-tighter uppercase leading-none">
            Trợ lý học tập
          </span>
          <span className="text-[8px] font-bold text-green-600 uppercase tracking-widest">
            Ecosystem
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-1.5 border-2 border-black rounded-lg bg-white hover:bg-green-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full text-[8px] text-white flex items-center justify-center font-bold">
            2
          </span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l-2 border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black uppercase leading-none">
              Trần Duy Dũng
            </p>
            <p className="text-[9px] font-bold text-green-600 uppercase mt-1">
              Student @ DTU
            </p>
          </div>
          <div className="w-10 h-10 bg-green-50 border-2 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <User size={22} className="text-green-700" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </header>
  );
}
