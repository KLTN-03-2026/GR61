"use client";
import React from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../../../stores/useNotificationStore";
import Link from "next/link";

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotificationStore();
  const count = unreadCount();

  return (
    <div className="relative group py-2">
      {/* Nút Chuông */}
      <button className="relative p-1.5 border-2 border-black rounded-lg bg-white hover:bg-green-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5 transition-all">
        <Bell size={20} strokeWidth={2.5} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[8px] text-white flex items-center justify-center font-black animate-bounce">
            {count}
          </span>
        )}
      </button>

      {/* Menu thả xuống khi hover */}
      <div className="absolute right-0 mt-2 w-72 bg-white border-[3px] border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden group-hover:block z-50 overflow-hidden transition-all">
        <div className="p-4 border-b-2 border-black bg-green-50 flex justify-between items-center">
          <span className="font-black uppercase italic text-xs">Thông báo</span>
          {count > 0 && <span className="text-[10px] font-bold text-red-500 underline cursor-pointer">Mới ({count})</span>}
        </div>
        
        <div className="max-h-80 overflow-y-auto no-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase italic">
              Thông báo trống...
            </div>
          ) : (
            notifications.slice(0, 3).map((n) => (
              <div 
                key={n.id} 
                onClick={() => markAsRead(n.id)}
                className={`p-4 border-b-2 border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-green-50/50' : ''}`}
              >
                <p className="text-xs font-black uppercase leading-tight mb-1">{n.title}</p>
                <p className="text-[10px] font-medium text-slate-600 line-clamp-2 leading-relaxed">{n.message}</p>
                <p className="text-[8px] font-bold text-slate-300 mt-2 uppercase italic">
                  {new Date(n.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>
        
        <div className="p-3 bg-slate-50 text-center border-t-2 border-black">
           <Link href="/users/notifications" className="text-[9px] font-black uppercase hover:underline">
             Xem tất cả
            </Link>
        </div>
      </div>
    </div>
  );
}