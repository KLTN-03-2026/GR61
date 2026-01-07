"use client";

import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Terminal } from "lucide-react";

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const loadData = useCallback(async () => {
    const res = await fetch("/api/thoiGianBieu");
    const data = await res.json();

    setEvents(
      data.map((item: any) => ({
        id: item.id.toString(),
        title: item.tieuDe,
        start: item.batDau,
        end: item.ketThuc,
      }))
    );
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelect = async (info: any) => {
    console.log("SELECT INFO:", info.startStr, info.endStr);

    // 🔥 CHỐT HẠ: không cho tạo nếu end <= start
    if (!info.endStr || info.startStr === info.endStr) {
      alert("❌ Vui lòng KÉO để chọn khoảng thời gian");
      return;
    }

    const title = prompt("Nhập tiêu đề thời gian biểu:");
    if (!title) return;

    const payload = {
      tieuDe: title,
      batDau: info.startStr,
      ketThuc: info.endStr,
    };

    console.log("POST PAYLOAD:", payload);

    const res = await fetch("/api/thoiGianBieu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      alert("❌ Server: " + result.message);
      return;
    }

    loadData();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black mb-6 flex items-center gap-2">
          <Terminal size={18} />
          Thời Gian Biểu
        </h1>

        <div className="bg-white p-6 border-4 border-black rounded-3xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable
            selectMirror
            selectAllow={(info) => info.end > info.start} // 🔥 ÉP HỢP LỆ
            events={events}
            select={handleSelect}
            eventClick={async (info) => {
              if (confirm(`Xóa "${info.event.title}"?`)) {
                await fetch(`/api/thoiGianBieu/${info.event.id}`, {
                  method: "DELETE",
                });
                loadData();
              }
            }}
            height="70vh"
          />
        </div>
      </div>
    </div>
  );
}
