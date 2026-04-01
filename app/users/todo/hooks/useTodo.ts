"use client";
import { useState, useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
import { useTodoStore } from "@/stores/useTodoStore";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Tạo bộ từ điển trọng số để dễ so sánh Priority
const priorityWeight: Record<string, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

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

  // LOGIC SẮP XẾP DỮ LIỆU
  const sortedTodos = useMemo(() => {
    if (!todos) return [];

    // Tạo bản sao của mảng để không mutate data gốc của SWR
    return [...todos].sort((a, b) => {
      // 1. So sánh trạng thái hoàn thành (Chưa làm lên trên, đã làm xuống dưới)
      if (a.status !== b.status) {
        return a.status === false ? -1 : 1;
      }

      // 2. Nếu cùng trạng thái, so sánh mức độ ưu tiên
      const weightA = priorityWeight[a.priority] || 0;
      const weightB = priorityWeight[b.priority] || 0;

      // Sắp xếp giảm dần (Điểm cao nằm trên)
      return weightB - weightA;
    });
  }, [todos]);

  // Cập nhật trạng thái hoàn thành
  const handleToggle = async (id: number, currentStatus: boolean) => {
    // Optimistic UI update (Tùy chọn: giúp UI phản hồi mượt hơn trước khi gọi API xong)
    mutate(
      todos.map((t: any) =>
        t.id === id ? { ...t, status: !currentStatus } : t,
      ),
      false,
    );

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
    todos: sortedTodos, // Trả về mảng đã được sắp xếp
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
