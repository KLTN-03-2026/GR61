"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowLeft,
  RotateCcw,
  Star,
} from "lucide-react";
import FlashcardItem from "../components/FlashcardItem";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function FolderDetailPage() {
  const { folderId } = useParams();
  const router = useRouter();
  const { data: cards, mutate } = useSWR(
    `/api/flashcard/card?folderId=${folderId}`,
    fetcher,
  );

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ front: "", back: "" });

  // Lọc dữ liệu thật từ Database
  const starredCards = useMemo(
    () => cards?.filter((c: any) => c.isStarred) || [],
    [cards],
  );
  const currentCard = cards?.[index];

  const handleToggleStarOnFlip = async () => {
    if (!currentCard) return;
    await axios.patch("/api/flashcard/card/star", {
      id: currentCard.id,
      isStarred: currentCard.isStarred,
    });
    mutate();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-black bg-white min-h-screen no-scrollbar">
      {/* HEADER */}
      <header className="flex justify-between items-center border-b-2 border-slate-100 pb-5">
        <button
          onClick={() => router.push("/users/flashcard")}
          className="flex items-center gap-2 font-black p-2 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[10px] uppercase"
        >
          <ArrowLeft size={14} strokeWidth={3} /> Quay lại
        </button>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter font-serif">
          Smart Learning Detail
        </h1>
        <button
          onClick={() => router.push(`/users/flashcard/${folderId}/quiz`)}
          className="bg-green-600 text-white font-black border-2 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] uppercase italic transition-all active:translate-y-0.5 active:shadow-none"
        >
          <Zap size={14} fill="white" /> Kiểm tra
        </button>
      </header>

      {/* KHU VỰC TRÊN: TRÁI HỌC - PHẢI TẠO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <section className="bg-slate-50 p-6 rounded-[32px] border-2 border-black border-dashed relative">
          <button
            onClick={handleToggleStarOnFlip}
            className="absolute top-10 right-10 z-10 p-2 bg-white border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform"
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

          <div
            onClick={() => setFlipped(!flipped)}
            className={`min-h-[260px] w-full bg-white border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 cursor-pointer duration-500 ${flipped ? "bg-green-50" : ""}`}
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
              className="p-2 border-2 border-black rounded-full bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-20"
            >
              <ChevronLeft size={20} strokeWidth={4} />
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
              className="p-2 border-2 border-black rounded-full bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-20"
            >
              <ChevronRight size={20} strokeWidth={4} />
            </button>
          </div>
        </section>

        <section className="p-6 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-lg font-black mb-6 uppercase italic border-b-2 border-black pb-1 inline-block">
            Tạo thẻ mới
          </h3>
          <div className="space-y-4">
            <input
              value={newCard.front}
              onChange={(e) =>
                setNewCard({ ...newCard, front: e.target.value })
              }
              className="w-full p-3 border-2 border-black rounded-xl font-bold bg-slate-50 text-xs outline-none focus:bg-white transition-colors"
              placeholder="Mặt trước..."
            />
            <textarea
              value={newCard.back}
              onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
              className="w-full p-3 border-2 border-black rounded-xl font-bold bg-slate-50 h-24 text-xs outline-none focus:bg-white transition-colors"
              placeholder="Mặt sau..."
            />
            <button
              onClick={async () => {
                if (!newCard.front || !newCard.back)
                  return alert("Nhập đủ 2 mặt nhé Dũng!");
                await axios.post("/api/flashcard/card", {
                  ...newCard,
                  folderId: Number(folderId),
                });
                setNewCard({ front: "", back: "" });
                mutate();
              }}
              className="w-full py-3 bg-green-600 text-white font-black rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-[10px] hover:bg-green-700 transition-all active:translate-y-0.5 active:shadow-none"
            >
              Lưu thẻ vào kho
            </button>
          </div>
        </section>
      </div>

      {/* KHU VỰC DƯỚI: TRÁI QUAN TRỌNG - PHẢI TẤT CẢ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <section className="space-y-4">
          <h3 className="text-lg font-black uppercase italic text-yellow-500 flex items-center gap-2">
            <Star size={18} fill="currentColor" /> Quan trọng (
            {starredCards.length})
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
            {starredCards.map((c: any) => (
              <FlashcardItem key={c.id} card={c} mutate={mutate} />
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-lg font-black uppercase italic text-slate-400 flex items-center gap-2">
            <div className="w-2 h-5 bg-black rounded-full"></div> Tất cả thẻ (
            {cards?.length || 0})
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
            {cards?.map((c: any) => (
              <FlashcardItem key={c.id} card={c} mutate={mutate} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
