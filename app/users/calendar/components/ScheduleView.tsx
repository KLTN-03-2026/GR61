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
        firstDay={1} // MỚI: Đặt Thứ 2 là ngày bắt đầu trong tuần
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
        eventContent={(info) => (
          <div
            className="p-1.5 flex flex-col gap-0.5 overflow-hidden text-white italic h-full w-full"
            style={{ backgroundColor: info.event.backgroundColor }}
          >
            {/* Hiện giờ */}
            <div className="text-[8px] font-black opacity-90 flex items-center gap-1">
              <span className="px-1 rounded border border-white/30 uppercase">
                {info.timeText}
              </span>
            </div>

            {/* Tiêu đề */}
            <div className="font-black uppercase text-[10px] leading-tight truncate mt-0.5">
              {info.event.title}
            </div>

            {/* Ghi chú */}
            {info.event.extendedProps.note && (
              <div className="text-[8px] font-medium opacity-70 border-t border-white/20 pt-0.5 truncate italic">
                {info.event.extendedProps.note}
              </div>
            )}
          </div>
        )}
      />

      <style jsx global>{`
        /* Nút điều hướng - Giữ nguyên xanh lá làm chủ đạo hệ thống */
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
          text-decoration: none !important;
        }

        /* THẺ SỰ KIỆN */
        .fc-event {
          border: 2px solid black !important;
          border-radius: 12px !important;
          cursor: grab;
          transition: transform 0.2s ease;
          overflow: hidden;
        }

        .fc-event-main {
          padding: 0 !important;
          background-color: transparent !important;
        }

        .fc-event:hover {
          transform: scale(1.02);
        }

        .fc-event-time,
        .fc-event-title {
          display: none;
        }

        /* Ẩn dấu chấm tròn mặc định trong lịch tháng */
        .fc-daygrid-event-dot {
          display: none;
        }
      `}</style>
    </div>
  );
}
