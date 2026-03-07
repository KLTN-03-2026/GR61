"use client";
import WeeklyCalendar from "./components/WeeklyCalendar";
import TodoList from "./components/TodoList";

export default function TodoPage() {
  return (
    <main className="flex h-screen w-full bg-white overflow-hidden origin-top-left mt-1">
      {/* Sidebar Lịch tuần */}
      <aside className="h-full bg-white shadow-sm scale-90 border-r-2 border-slate-50">
        <WeeklyCalendar />
      </aside>
      {/* Nội dung danh sách nhiệm vụ */}
      <section className="flex-1 h-full overflow-y-auto bg-white scale-95 no-scrollbar">
        <h1 className="text-6xl text-center text-black font-black uppercase italic tracking-tighter mt-4">
          TODOLIST
        </h1>
        <TodoList />
      </section>
    </main>
  );
}
