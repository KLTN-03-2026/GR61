"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Zap,
  ArrowLeft,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
} from "lucide-react";
import { useFlashcardDetail } from "../hooks/useFlashcardDetail";
import FlashcardItem from "../components/FlashcardItem";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FolderDetailPage() {
  const { folderId } = useParams();
  const router = useRouter();
  const { data: cards, mutate } = useSWR(
    `/api/flashcard/card?folderId=${folderId}`,
    fetcher,
  );

  const {
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
  } = useFlashcardDetail(cards || [], mutate);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-white min-h-screen text-black no-scrollbar">
      {/* HEADER */}
      <header className="flex justify-between items-center border-b-2 border-slate-100 pb-5">
        <button
          onClick={() => router.push("/users/flashcard")}
          className="flex items-center gap-2 font-black p-2 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] text-[10px] uppercase hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={14} /> Quay lại
        </button>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">
          Smart Learning
        </h1>
        <button
          onClick={() => router.push(`/users/flashcard/${folderId}/quiz`)}
          className="bg-green-600 text-white font-black border-2 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_#000] text-[10px] uppercase italic active:translate-y-0.5"
        >
          <Zap size={14} fill="white" /> Kiểm tra
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* KHỐI LẬT THÈ CÓ NGÔI SAO */}
        <section className="bg-slate-50 p-6 rounded-[32px] border-2 border-black border-dashed relative">
          {/* Nút ngôi sao trên thẻ chính theo ý Dũng */}
          {cards?.length > 0 && (
            <button
              onClick={() => toggleStar(currentCard.id, currentCard.isStarred)}
              className="absolute top-10 right-10 z-10 p-2 bg-white border-2 border-black rounded-full shadow-[3px_3px_0px_0px_#000] hover:scale-110 transition-transform"
            >
              <Star
                size={20}
                className={
                  currentCard?.isStarred
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300"
                }
              />
            </button>
          )}

          <div
            onClick={() => setFlipped(!flipped)}
            className={`min-h-[280px] w-full bg-white border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_#000] flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300 ${flipped ? "bg-green-50" : ""}`}
          >
            <h2 className="text-2xl font-black text-center uppercase italic break-words w-full">
              {cards?.length > 0
                ? flipped
                  ? currentCard?.back
                  : currentCard?.front
                : "Trống"}
            </h2>
            <p className="mt-6 font-black text-slate-300 text-[8px] uppercase tracking-widest flex items-center gap-1">
              <RotateCcw size={10} /> Chạm để lật
            </p>
          </div>

          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              disabled={index === 0}
              onClick={() => {
                setIndex(index - 1);
                setFlipped(false);
              }}
              className="p-2 border-2 border-black rounded-full bg-white shadow-[2px_2px_0px_0px_#000] disabled:opacity-20"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-black italic">
              {cards?.length > 0 ? index + 1 : 0} / {cards?.length || 0}
            </span>
            <button
              disabled={index === (cards?.length || 1) - 1}
              onClick={() => {
                setIndex(index + 1);
                setFlipped(false);
              }}
              className="p-2 border-2 border-black rounded-full bg-white shadow-[2px_2px_0px_0px_#000] disabled:opacity-20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* KHỐI TẠO THẺ */}
        <section className="p-6 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_#000]">
          <h3 className="text-lg font-black mb-6 uppercase italic border-b-2 border-black pb-1 inline-block">
            Tạo thẻ mới
          </h3>
          <div className="space-y-4">
            <input
              value={newCard.front}
              onChange={(e) =>
                setNewCard({ ...newCard, front: e.target.value })
              }
              className="w-full p-4 border-2 border-black rounded-2xl font-bold bg-slate-50 focus:bg-white outline-none"
              placeholder="Mặt trước..."
            />
            <textarea
              value={newCard.back}
              onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
              className="w-full p-4 border-2 border-black rounded-2xl font-bold bg-slate-50 h-28 focus:bg-white outline-none"
              placeholder="Mặt sau..."
            />
            <button
              onClick={() => handleCreateCard(Number(folderId))}
              className="w-full py-4 bg-green-600 text-white font-black rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase text-[11px] hover:bg-green-700"
            >
              Lưu thẻ vào kho
            </button>
          </div>
        </section>
      </div>

      {/* DANH SÁCH THẺ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <section className="space-y-4">
          <h3 className="text-lg font-black uppercase italic text-yellow-500 flex items-center gap-2">
            <Star size={18} fill="currentColor" /> Quan trọng (
            {starredCards.length})
          </h3>
          <div className="space-y-3 max-h-[450px] overflow-y-auto no-scrollbar">
            {starredCards.map((c: any) => (
              <FlashcardItem
                key={c.id}
                card={c}
                mutate={mutate}
                onDelete={deleteCard}
                onEdit={setEditingCard}
              />
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-lg font-black uppercase italic text-slate-400 flex items-center gap-2">
            <div className="w-2 h-5 bg-black rounded-full"></div> Tất cả thẻ (
            {cards?.length || 0})
          </h3>
          <div className="space-y-3 max-h-[450px] overflow-y-auto no-scrollbar">
            {cards?.map((c: any) => (
              <FlashcardItem
                key={c.id}
                card={c}
                mutate={mutate}
                onDelete={deleteCard}
                onEdit={setEditingCard}
              />
            ))}
          </div>
        </section>
      </div>

      {/* MODAL SỬA THẺ */}
      {editingCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-[3px] border-black rounded-[32px] p-8 shadow-[10px_10px_0px_0px_#000] w-full max-w-md relative">
            <button
              onClick={() => setEditingCard(null)}
              className="absolute top-6 right-6 p-1 border-2 border-black rounded-lg hover:bg-slate-100"
            >
              <X size={16} />
            </button>
            <h2 className="text-2xl font-black uppercase italic mb-6 tracking-tighter">
              Sửa nội dung thẻ
            </h2>
            <form onSubmit={handleUpdateCard} className="space-y-6">
              <input
                value={editingCard.front}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, front: e.target.value })
                }
                className="w-full p-4 border-2 border-black rounded-2xl font-bold bg-slate-50 outline-none"
              />
              <textarea
                value={editingCard.back}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, back: e.target.value })
                }
                className="w-full p-4 border-2 border-black rounded-2xl font-bold bg-slate-50 h-28 outline-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-black rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase text-[11px]"
              >
                Cập nhật ngay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
