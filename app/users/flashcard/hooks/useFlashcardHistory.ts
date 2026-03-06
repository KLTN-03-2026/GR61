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

    // XỬ LÝ LOGIC CHU KỲ THỨ 2 -> CHỦ NHẬT
    if (timeRange === "week") {
      const day = now.getDay(); // 0: CN, 1: T2...
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Tìm ngày Thứ 2
      const monday = new Date(now.setDate(diff));

      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const label = `${d.getDate()}/${d.getMonth() + 1}`;
        dataMap[label] = { scoreTotal: 0, count: 0 };
      }
    } else if (timeRange === "month") {
      const daysInMonth = new Date().getDate(); // Từ ngày 1 đến nay
      for (let i = 1; i <= daysInMonth; i++) {
        const label = `${i}/${now.getMonth() + 1}`;
        dataMap[label] = { scoreTotal: 0, count: 0 };
      }
    } else {
      const currentMonth = now.getMonth(); // Từ tháng 1 đến nay
      for (let i = 0; i <= currentMonth; i++) {
        const label = `Tháng ${i + 1}`;
        dataMap[label] = { scoreTotal: 0, count: 0 };
      }
    }

    // Đổ dữ liệu thật từ database
    history.forEach((item: any) => {
      const itemDate = new Date(item.createdAt);
      let label = "";
      if (timeRange === "year") {
        label = `Tháng ${itemDate.getMonth() + 1}`;
      } else {
        label = `${itemDate.getDate()}/${itemDate.getMonth() + 1}`;
      }

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
