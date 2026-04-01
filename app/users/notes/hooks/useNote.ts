"use client";
import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export interface Category {
  id: string;
  name: string;
  color: string;
}

export function useNote() {
  const { data: notes, mutate, isLoading } = useSWR("/api/note", fetcher);

  // Quản lý Thể loại (Lưu LocalStorage)
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dtu_note_cats");
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      // Dữ liệu mặc định nếu người dùng chưa từng tạo
      const defaultCats = [
        { id: "1", name: "HỌC TẬP", color: "#bfdbfe" },
        { id: "2", name: "CÔNG VIỆC", color: "#fde047" },
        { id: "3", name: "CÁ NHÂN", color: "#bbf7d0" },
      ];
      setCategories(defaultCats);
      localStorage.setItem("dtu_note_cats", JSON.stringify(defaultCats));
    }
  }, []);

  const syncCategories = useCallback((newCats: Category[]) => {
    setCategories(newCats);
    localStorage.setItem("dtu_note_cats", JSON.stringify(newCats));
  }, []);

  // API Actions
  const togglePin = async (id: number, currentPin: boolean) => {
    if (!notes) return;
    mutate(
      notes.map((n: any) =>
        n.id === id ? { ...n, isPinned: !currentPin } : n,
      ),
      false,
    );
    await axios.put(`/api/note/${id}`, { isPinned: !currentPin });
    mutate();
  };

  const deleteNote = async (id: number) => {
    if (confirm("Chắc chắn muốn xóa ghi chú này?")) {
      await axios.delete(`/api/note/${id}`);
      mutate();
    }
  };

  const saveNote = async (formData: any) => {
    if (formData.id) {
      await axios.put(`/api/note/${formData.id}`, formData);
    } else {
      await axios.post("/api/note", formData);
    }
    mutate();
  };

  return {
    notes: notes || [],
    isLoading,
    categories,
    syncCategories,
    togglePin,
    deleteNote,
    saveNote,
  };
}
