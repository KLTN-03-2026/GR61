"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { Clock, Trophy, ArrowLeft, Zap, Target } from "lucide-react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function FastQuizPage() {
  const { folderId } = useParams();
  const router = useRouter();

  const { data: quizData, isLoading } = useSWR(
    `/api/flashcard/quiz?folderId=${folderId}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isLoading || isFinished) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isLoading, isFinished]);

  const handleAnswer = async (selected: string) => {
    const isCorrect = selected === quizData[index].back;
    const newCorrect = isCorrect ? correct + 1 : correct;
    setCorrect(newCorrect);

    if (index + 1 < quizData.length) {
      setIndex(index + 1);
    } else {
      setIsFinished(true);
      await axios.post("/api/flashcard/history", {
        folderId: parseInt(folderId as string),
        correct: newCorrect,
        total: quizData.length,
        time: timer,
      });
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse uppercase text-[10px] tracking-widest">
        Đang chuẩn bị đề thi...
      </div>
    );

  if (isFinished) {
    return (
      <div className="h-screen flex items-center justify-center bg-white p-6 text-slate-900">
        <div className="max-w-sm w-full border-2 border-slate-100 p-8 rounded-[32px] shadow-xl text-center bg-white">
          <Trophy size={48} className="text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-1 uppercase italic tracking-tighter">
            Kết quả
          </h2>
          <div className="text-7xl font-black leading-none mb-8 text-green-600 italic">
            {Math.round((correct / quizData.length) * 100)}%
          </div>
          <button
            onClick={() => router.push(`/users/flashcard/${folderId}`)}
            className="w-full py-4 bg-green-600 text-white font-black rounded-xl shadow-lg hover:bg-green-700 transition-all uppercase italic text-xs"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    );
  }

  const current = quizData[index];

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 flex flex-col items-center no-scrollbar">
      <div className="w-full max-w-2xl">
        {/* HEADER: ĐÃ TỐI GIẢN VÀ DỊCH LÊN TRÊN */}
        <header className="flex justify-between items-center mb-6 pt-2">
          <button
            onClick={() => router.push(`/users/flashcard/${folderId}`)}
            className="p-2 text-green-700 bg-white rounded-lg hover:bg-green-700 hover:text-white transition-colors"
          >
            <ArrowLeft size={26} strokeWidth={3} />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-green-700 border-black border-2 text-white px-4 py-1.5 rounded-full font-black flex items-center gap-2 text-xs italic shadow-md">
              <Clock size={14} /> {formatTime(timer)}
            </div>
            <div className="text-[11px] font-black uppercase bg-white border-2  border-black px-4 py-1.5 rounded-full shadow-sm">
              {index + 1} / {quizData.length}
            </div>
          </div>
        </header>

        {/* THẺ CÂU HỎI: SHADOW-XL VÀ CHỐNG TRÀN */}
        <div className="mb-8 p-10 bg-white rounded-[32px] shadow-xl min-h-[180px] flex flex-col items-center justify-center relative overflow-hidden border-2 border-black shadow-2xl shadow-gray-400">
          <div className="absolute -bottom-4 -right-4 opacity-5">
            <Zap size={100} fill="green" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Target size={14} className="text-green-600" />
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
              Question
            </p>
          </div>
          <h2 className="text-2xl md:text-3xl font-black leading-tight text-center uppercase italic break-words w-full whitespace-pre-wrap px-4">
            {current?.front}
          </h2>
        </div>

        {/* ĐÁP ÁN: 2 CỘT VÀ SHADOW-XL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current?.options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="group flex items-center p-5 bg-white border-2 hover:bg-green-600 hover:text-white text-slate-900 border-balck rounded-[24px] shadow-2xl hover:shadow-2xl active:translate-y-1 transition-all text-left min-h-[80px] shadow-2xl shadow-gray-400"
            >
              <div className="w-8 h-8 flex-shrink-0 bg-green-600 text-white border-2 border-black rounded-lg flex items-center justify-center font-black mr-4 text-[10px] group-hover:bg-white group-hover:text-green-700 transition-colors">
                {String.fromCharCode(65 + i)}
              </div>
              <span className="text-sm font-black tracking-tight uppercase italic leading-tight break-words flex-1">
                {opt}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
