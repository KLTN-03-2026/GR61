"use client";
import { Star, Edit3, Trash2 } from "lucide-react";
import axios from "axios";

export default function FlashcardItem({ card, mutate }: any) {
  const toggleStar = async () => {
    try {
      await axios.patch("/api/flashcard/card/star", {
        id: card.id,
        isStarred: card.isStarred,
      });
      mutate(); // Cập nhật danh sách ngay lập tức
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`p-4 border-2 border-black rounded-2xl flex justify-between items-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white hover:translate-x-1 transition-all ${card.isStarred ? "bg-yellow-50/40" : ""}`}
    >
      <div className="flex-1 min-w-0 pr-4">
        <p className="font-black text-slate-900 truncate uppercase text-[11px] break-words whitespace-pre-wrap">
          {card.front}
        </p>
        <p className="text-[9px] font-bold text-slate-400 truncate italic mt-0.5">
          {card.back}
        </p>
      </div>
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={toggleStar}
          className="p-1.5 border-2 border-black rounded-lg bg-white hover:bg-yellow-100 transition-colors"
        >
          <Star
            size={14}
            className={
              card.isStarred
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300"
            }
          />
        </button>
        <button className="p-1.5 border-2 border-black rounded-lg bg-white hover:bg-slate-100">
          <Edit3 size={14} />
        </button>
        <button className="p-1.5 border-2 border-black rounded-lg bg-white text-red-500 hover:bg-red-500 hover:text-white">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
