"use client";

import React, { useEffect, useState } from "react";
import ScheduleView from "./ScheduleView";
import { EventClickArg } from "@fullcalendar/core";

interface EventItem {
  id: string;
  title: string;
  start: string;
  end: string;
}

export default function SchedulePage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch (err) {
        console.error("Lỗi parse localStorage:", err);
      }
    }
  }, []);

  const saveEvents = (updated: EventItem[]) => {
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  // ================= ADD =================
  const handleAddEvent = () => {
    if (!newTitle || !newStart || !newEnd) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newEvent: EventItem = {
      id: crypto.randomUUID(),
      title: newTitle,
      start: newStart,
      end: newEnd,
    };

    saveEvents([...events, newEvent]);

    setNewTitle("");
    setNewStart("");
    setNewEnd("");
    setShowAddPopup(false);
  };

  // ================= CLICK EVENT =================
  const handleEventClick = (info: EventClickArg) => {
    const found = events.find((e) => e.id === info.event.id);
    if (found) {
      setSelectedEvent(found);
      setShowEditPopup(true);
    }
  };

  // ================= EDIT =================
  const handleSaveEdit = () => {
    if (!selectedEvent) return;

    const updated = events.map((e) =>
      e.id === selectedEvent.id ? selectedEvent : e
    );

    saveEvents(updated);
    setShowEditPopup(false);
  };

  const handleDelete = () => {
    if (!selectedEvent) return;

    const updated = events.filter((e) => e.id !== selectedEvent.id);
    saveEvents(updated);
    setShowEditPopup(false);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        📅 Lịch học của bạn
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddPopup(true)}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          ➕ Thêm
        </button>
      </div>

      <ScheduleView events={events} onEventClick={handleEventClick} />

      {/* ================= ADD POPUP ================= */}
      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] space-y-4">
            <h3 className="text-xl font-bold text-center">
              ➕ Thêm lịch học
            </h3>

            <input
              type="text"
              placeholder="Tên môn học"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="datetime-local"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="datetime-local"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between pt-4">
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT POPUP ================= */}
      {showEditPopup && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] space-y-4">
            <h3 className="text-xl font-bold text-center">
              🛠️ Sửa lịch học
            </h3>

            <input
              type="text"
              value={selectedEvent.title}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  title: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />

            <input
              type="datetime-local"
              value={selectedEvent.start}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  start: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />

            <input
              type="datetime-local"
              value={selectedEvent.end}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  end: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between pt-4">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Lưu
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowEditPopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}