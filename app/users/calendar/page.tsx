"use client";
import React from "react";
import { useSchedule } from "./hooks/useSchedule";
import ScheduleHeader from "./components/ScheduleHeader";
import ScheduleView from "./components/ScheduleView";
import EventModal from "./components/EventModal";
import CategoryModal from "./components/CategoryModal";

export default function SchedulePage() {
  const { events, categories, popups, setPopups, form, setForm, sync } =
    useSchedule();

  // Logic xử lý lưu và xóa tập trung tại đây để dễ kiểm soát
  const handleSave = () => {
    const cate = categories.find((c) => c.id === form.categoryId);
    const data = { ...form, backgroundColor: cate?.color || "#16a34a" };
    popups.add
      ? sync([...events, { ...data, id: crypto.randomUUID() }])
      : sync(events.map((e) => (e.id === form.id ? data : e)));
    setPopups({ ...popups, add: false, edit: false });
  };

  return (
    <div className="p-8 space-y-4 bg-white min-h-screen no-scrollbar">
      <ScheduleHeader onOpenCate={() => setPopups({ ...popups, cate: true })} />

      <ScheduleView
        events={events}
        onEventChange={(fc: any) =>
          sync(
            events.map((e) =>
              e.id === fc.id
                ? { ...e, start: fc.startStr, end: fc.endStr || fc.startStr }
                : e,
            ),
          )
        }
        onDateSelect={(info: any) => {
          setForm({
            id: "",
            title: "",
            start: info.startStr.slice(0, 16),
            end: info.endStr.slice(0, 16),
            note: "",
            categoryId: "1",
          });
          setPopups({ ...popups, add: true });
        }}
        onEventClick={(info: any) => {
          const found = events.find((e) => e.id === info.event.id);
          if (found) {
            setForm(found);
            setPopups({ ...popups, edit: true });
          }
        }}
      />

      {(popups.add || popups.edit) && (
        <EventModal
          type={popups.add ? "add" : "edit"}
          form={form}
          setForm={setForm}
          categories={categories}
          onClose={() => setPopups({ ...popups, add: false, edit: false })}
          onSave={handleSave}
          onDelete={() => {
            if (confirm("Xóa?")) {
              sync(events.filter((e) => e.id !== form.id));
              setPopups({ ...popups, edit: false });
            }
          }}
        />
      )}

      {popups.cate && (
        <CategoryModal
          categories={categories}
          onSync={(newCats: any) => sync(events, newCats)}
          onClose={() => setPopups({ ...popups, cate: false })}
        />
      )}
    </div>
  );
}
