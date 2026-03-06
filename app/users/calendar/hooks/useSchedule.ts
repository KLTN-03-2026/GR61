"use client";
import { useState, useEffect } from "react";

export function useSchedule() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([
    { id: "1", name: "Học tập", color: "#16a34a" },
    { id: "2", name: "Làm việc", color: "#2563eb" },
    { id: "3", name: "Thể thao", color: "#f59e0b" },
  ]);
  const [popups, setPopups] = useState({
    add: false,
    edit: false,
    cate: false,
  });
  const [form, setForm] = useState<any>({
    id: "",
    title: "",
    start: "",
    end: "",
    note: "",
    categoryId: "1",
  });

  useEffect(() => {
    const stored = localStorage.getItem("dtu_events_final");
    const storedCate = localStorage.getItem("dtu_cats_final");
    if (stored) setEvents(JSON.parse(stored));
    if (storedCate) setCategories(JSON.parse(storedCate));
  }, []);

  const sync = (newEvs: any[], newCats?: any[]) => {
    setEvents(newEvs);
    localStorage.setItem("dtu_events_final", JSON.stringify(newEvs));
    if (newCats) {
      setCategories(newCats);
      localStorage.setItem("dtu_cats_final", JSON.stringify(newCats));
    }
  };

  return { events, categories, popups, setPopups, form, setForm, sync };
}
