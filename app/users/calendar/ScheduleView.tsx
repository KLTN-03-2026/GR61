"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";

interface EventItem {
  id: string;
  title: string;
  start: string;
  end: string;
}

export default function ScheduleView({
  events,
  onEventClick,
}: {
  events: EventItem[];
  onEventClick: (info: EventClickArg) => void;
}) {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events.map((e) => ({ ...e, color: "#16a34a" }))}
        eventClick={onEventClick}
        height="auto"
      />

      <style jsx global>{`
        .fc {
          background-color: white !important;
          color: black !important;
        }

        .fc-toolbar-title,
        .fc-col-header-cell-cushion,
        .fc-daygrid-day-number,
        .fc-timegrid-slot-label,
        .fc-timegrid-axis,
        .fc-daygrid-day-top {
          color: black !important;
        }

        .fc .fc-col-header-cell {
          background-color: #f3f4f6 !important;
        }

        .fc-event {
          background-color: #16a34a !important;
          color: white !important;
          border: none !important;
        }

        .fc-button {
          background-color: black !important;
          color: white !important;
          border: none !important;
        }

        .fc-button:hover {
          background-color: #333 !important;
        }
      `}</style>
    </div>
  );
}
