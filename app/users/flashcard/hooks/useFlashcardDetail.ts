"use client";
import { useState, useMemo } from "react";
import axios from "axios";

export function useFlashcardDetail(cards: any[], mutate: any) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ front: "", back: "" });

  // State cho việc sửa thẻ
  const [editingCard, setEditingCard] = useState<any>(null);

  const starredCards = useMemo(
    () => cards?.filter((c: any) => c.isStarred) || [],
    [cards],
  );
  const currentCard = cards?.[index];

  // Hàm đổi trạng thái sao (Dùng chung)
  const toggleStar = async (cardId: number, currentState: boolean) => {
    await axios.patch("/api/flashcard/card/star", {
      id: cardId,
      isStarred: currentState,
    });
    mutate();
  };

  const deleteCard = async (id: number) => {
    if (confirm("Xác nhận xóa thẻ này?")) {
      await axios.delete(`/api/flashcard/card?id=${id}`);
      mutate();
    }
  };

  // Hàm lưu thẻ sau khi sửa
  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.patch("/api/flashcard/card", editingCard);
    setEditingCard(null);
    mutate();
  };

  const handleCreateCard = async (folderId: number) => {
    if (!newCard.front || !newCard.back) return alert("Nhập đủ 2 mặt!");
    await axios.post("/api/flashcard/card", { ...newCard, folderId });
    setNewCard({ front: "", back: "" });
    mutate();
  };

  return {
    index,
    setIndex,
    flipped,
    setFlipped,
    newCard,
    setNewCard,
    starredCards,
    currentCard,
    toggleStar,
    deleteCard,
    editingCard,
    setEditingCard,
    handleUpdateCard,
    handleCreateCard,
  };
}
