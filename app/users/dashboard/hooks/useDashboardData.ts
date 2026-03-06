"use client";
import { useState, useEffect } from "react";
import { isSameDay } from "date-fns";

export function useDashboardData() {
  const [stats, setStats] = useState({
    todayEvents: 0,
    todoDone: 0,
    todoPending: 0,
    progress: 0,
    flashcardFolders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // A. Lấy Lịch học hôm nay từ LocalStorage
        const localEvents = JSON.parse(
          localStorage.getItem("dtu_events_final") || "[]",
        );
        const todayEvs = localEvents.filter((e: any) =>
          isSameDay(new Date(e.start), new Date()),
        ).length;

        // B. Lấy Todo & Flashcard từ Database API
        const res = await fetch("/api/user/dashboard");
        if (res.ok) {
          const dbData = await res.json();
          setStats({
            todayEvents: todayEvs,
            todoDone: dbData.doneTodos || 0,
            todoPending: dbData.pendingTodos || 0,
            progress: dbData.performance || 0,
            flashcardFolders: dbData.flashcardFolders || 0,
          });
        }
      } catch (err) {
        console.error("Load Dashboard Stats Failed", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return { stats, loading };
}
