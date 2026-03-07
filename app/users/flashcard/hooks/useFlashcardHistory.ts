"use client";
import useSWR from "swr";
import axios from "axios";
import { useMemo } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useFlashcardHistory(
  timeRange: "week" | "month" | "year" = "week",
) {
  const { data: history, isLoading } = useSWR(
    "/api/flashcard/history",
    fetcher,
  );

  const chartData = useMemo(() => {
    if (!history) return [];
    const now = new Date();
    const dataMap: { [key: string]: { scoreTotal: number; count: number } } =
      {};

    // 1. Khởi tạo mốc thời gian (Tuần: T2->CN | Tháng: 1->Nay)
    if (timeRange === "week") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(now.setDate(diff));
      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        dataMap[`${d.getDate()}/${d.getMonth() + 1}`] = {
          scoreTotal: 0,
          count: 0,
        };
      }
    } else if (timeRange === "month") {
      for (let i = 1; i <= new Date().getDate(); i++) {
        dataMap[`${i}/${now.getMonth() + 1}`] = { scoreTotal: 0, count: 0 };
      }
    } else {
      for (let i = 0; i <= now.getMonth(); i++)
        dataMap[`Tháng ${i + 1}`] = { scoreTotal: 0, count: 0 };
    }

    // 2. Đổ dữ liệu từ API vào biểu đồ
    history.forEach((item: any) => {
      const itemDate = new Date(item.createdAt);
      const label =
        timeRange === "year"
          ? `Tháng ${itemDate.getMonth() + 1}`
          : `${itemDate.getDate()}/${itemDate.getMonth() + 1}`;
      if (dataMap[label]) {
        dataMap[label].scoreTotal += item.score;
        dataMap[label].count += 1;
      }
    });

    return Object.keys(dataMap).map((key) => ({
      date: key,
      score:
        dataMap[key].count > 0
          ? Math.round(dataMap[key].scoreTotal / dataMap[key].count)
          : 0,
      count: dataMap[key].count,
    }));
  }, [history, timeRange]);

  return { history, chartData, isLoading };
}
