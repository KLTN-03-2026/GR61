"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export function useQuizLogic(folderId: string, quizData: any[]) {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Bộ đếm thời gian
  useEffect(() => {
    if (!quizData || isFinished) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [quizData, isFinished]);

  const handleAnswer = async (selected: string) => {
    const isCorrect = selected === quizData[index].back;
    const newCorrect = isCorrect ? correct + 1 : correct;
    setCorrect(newCorrect);

    if (index + 1 < quizData.length) {
      setIndex(index + 1);
    } else {
      setIsFinished(true);
      // Gửi kết quả về MySQL để lưu lịch sử
      await axios.post("/api/flashcard/history", {
        folderId: parseInt(folderId),
        correctAnswers: newCorrect,
        totalQuestions: quizData.length,
        timeSpent: timer,
        score: Math.round((newCorrect / quizData.length) * 100),
      });
    }
  };

  return {
    index,
    correct,
    timer,
    isFinished,
    handleAnswer,
    current: quizData?.[index],
  };
}
