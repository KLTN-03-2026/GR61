"use client";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
import { useTodoStore } from "@/stores/useTodoStore";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useTodo() {
  const { selectedDate } = useTodoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<any>(null);

  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const {
    data: todos,
    mutate,
    isLoading,
  } = useSWR(`/api/todo?date=${dateStr}`, fetcher);

  // Cập nhật trạng thái hoàn thành
  const handleToggle = async (id: number, currentStatus: boolean) => {
    await axios.patch(`/api/todo/${id}`, { status: !currentStatus });
    mutate(); // Re-fetch dữ liệu ngầm để UI luôn mới
  };

  // Logic lưu dữ liệu (Cả thêm và sửa)
  const handleSaveTodo = async (formData: any) => {
    try {
      if (formData.id) {
        await axios.patch(`/api/todo/${formData.id}`, formData);
      } else {
        await axios.post("/api/todo", {
          ...formData,
          targetDate: selectedDate,
        });
      }
      setIsModalOpen(false);
      setEditingTodo(null);
      mutate();
    } catch (err) {
      alert("Lỗi lưu nhiệm vụ!");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Xác nhận xóa?")) {
      await axios.delete(`/api/todo/${id}`);
      mutate();
    }
  };

  return {
    todos,
    selectedDate,
    isModalOpen,
    setIsModalOpen,
    editingTodo,
    setEditingTodo,
    handleToggle,
    handleSaveTodo,
    handleDelete,
    isLoading,
  };
}
