"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function ScheduleView({
  events,
  onEventClick,
  onDateSelect,
  onEventChange,
}: any) {
  return (
    <div className="bg-white w-full no-scrollbar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        select={onDateSelect}
        eventClick={onEventClick}
        eventDrop={(info) => onEventChange(info.event)}
        eventResize={(info) => onEventChange(info.event)}
        dayHeaderFormat={{
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          separator: " - ",
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale="vi"
        events={events}
        height="auto"
        // CẬP NHẬT HIỂN THỊ NỘI DUNG THẺ
        eventContent={(info) => (
          <div className="p-1.5 flex flex-col gap-0.5 overflow-hidden text-white italic h-full">
            {/* 1. HIỂN THỊ GIỜ (VD: 08:00 - 10:00) */}
            <div className="text-[8px] font-black opacity-90 flex items-center gap-1">
              <span className="bg-white/20 px-1 rounded border border-white/30 uppercase">
                {info.timeText}
              </span>
            </div>

            {/* 2. TIÊU ĐỀ MÔN HỌC */}
            <div className="font-black uppercase text-[10px] leading-tight truncate mt-0.5">
              {info.event.title}
            </div>

            {/* 3. GHI CHÚ NHỎ */}
            {info.event.extendedProps.note && (
              <div className="text-[8px] font-medium opacity-70 border-t border-white/20 pt-0.5 truncate italic">
                {info.event.extendedProps.note}
              </div>
            )}
          </div>
        )}
      />

      <style jsx global>{`
        /* Nút điều hướng Green-600 viền 2px */
        .fc-button-primary {
          background-color: #16a34a !important;
          border: 2px solid black !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          font-size: 10px !important;
          box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1) !important;
        }

        .fc-col-header-cell-cushion {
          font-weight: 800;
          color: black;
          font-size: 13px;
          text-transform: capitalize;
          padding: 10px 0;
        }

        /* Thẻ sự kiện: Viền mỏng 2px đồng bộ phong cách Dũng */
        .fc-event {
          border: 2px solid black !important;
          border-radius: 12px !important;
          cursor: grab;
          transition: transform 0.2s ease;
        }
        .fc-event:hover {
          transform: scale(1.02);
        }

        /* Ẩn bớt các ký hiệu thừa của mặc định FullCalendar */
        .fc-event-time {
          display: none;
        }
        .fc-event-title {
          display: none;
        }
      `}</style>
    </div>
  );
}
