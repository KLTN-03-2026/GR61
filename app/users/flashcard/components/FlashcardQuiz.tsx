"use client";
import { useQuiz } from "../hooks/useQuiz";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export default function FlashcardQuiz({ cards, folderId, onFinish }: any) {
  // 1. Gọi đúng các biến mà Hook cũ trả về: index, correct, current
  const { index, correct, timer, isFinished, handleAnswer, current } = useQuiz(
    folderId,
    cards,
  );

  // Tính tổng số câu dựa trên props cards truyền vào
  const total = cards?.length || 0;

  if (isFinished) {
    const finalPercent = total > 0 ? (correct / total) * 100 : 0;
    return (
      <div className="text-center p-10 border-[5px] border-black rounded-[40px] bg-yellow-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
        <h2 className="text-5xl font-black mb-4 uppercase">KẾT QUẢ</h2>
        <p className="text-8xl font-black mb-4">{finalPercent.toFixed(1)}%</p>
        <p className="text-xl font-bold mb-8 italic text-black">
          Bạn trả lời đúng {correct}/{total} câu trong {timer} giây
        </p>
        <button
          onClick={() => onFinish()}
          className="px-10 py-4 bg-black text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase border-2 border-white"
        >
          XONG
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header: Dùng 'index' thay vì 'currentIndex' để hết lỗi NaN */}
      <div className="flex justify-between items-center bg-white p-6 border-[4px] border-black rounded-[25px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black">
        <div className="flex items-center gap-2 text-2xl italic">
          <Clock className="text-blue-600" size={28} /> {timer}s
        </div>
        <div className="text-xl uppercase">
          CÂU HỎI: {index + 1} / {total}
        </div>
      </div>

      {/* Thẻ câu hỏi: Dùng 'current' thay vì 'currentCard' */}
      <div className="aspect-[4/3] flex items-center justify-center bg-white border-[5px] border-black rounded-[40px] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-10 relative overflow-hidden">
        <h3 className="text-4xl font-black text-center leading-tight text-slate-800">
          {current?.front}
        </h3>
      </div>

      {/* Nút bấm Đúng/Sai */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleAnswer("")} // Truyền chuỗi rỗng để Hook tính là SAI
          className="flex flex-col items-center gap-2 p-6 bg-red-400 border-[4px] border-black rounded-[30px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all group"
        >
          <XCircle
            size={45}
            strokeWidth={3}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-black uppercase italic">Chưa thuộc</span>
        </button>
        <button
          onClick={() => handleAnswer(current?.back || "")} // Truyền đúng 'back' để Hook tính là ĐÚNG
          className="flex flex-col items-center gap-2 p-6 bg-green-400 border-[4px] border-black rounded-[30px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all group"
        >
          <CheckCircle
            size={45}
            strokeWidth={3}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-black uppercase italic">Đã thuộc</span>
        </button>
      </div>
    </div>
  );
}
