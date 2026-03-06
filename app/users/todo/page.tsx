"use client";
import WeeklyCalendar from "./WeeklyCalendar";
import TodoList from "./TodoList";

export default function TodoPage() {
  return (
    // Thêm origin-top-left và scale-90 (hoặc scale-[0.85])
    <main className="flex h-screen w-full bg-white overflow-hidden origin-top-left mt-1 ">
      <aside className="h-full  bg-white shadow-sm scale-90">
        <WeeklyCalendar />
      </aside>
      <section className="flex-1 h-full overflow-y-auto bg-white scale-95">
        <h1 className="text-6xl flex justify-center text-black font-bold">
          TODOLIST
        </h1>
        <TodoList />
      </section>
    </main>
  );
}
