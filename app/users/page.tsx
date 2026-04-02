"use client";
import React from "react";
import useSWR from "swr";
import { useDashboardData } from "./dashboard/hooks/useDashboardData";

// Import 3 mảnh ghép chính
import DashboardHero from "./dashboard/components/DashboardHero";
import StatGrid from "./dashboard/components/StatGrid";
import AiInsights from "./dashboard/components/AiInsights";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OverviewPage() {
  const { stats, loading } = useDashboardData();
  const { data: profile } = useSWR("/api/profile", fetcher);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center font-black italic text-green-600 animate-pulse text-2xl uppercase">
        ĐANG ĐỒNG BỘ DỮ LIỆU...
      </div>
    );

  const shortName = profile?.hoTen?.split(" ").pop() || "Dũng";

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col space-y-6 p-4 lg:p-6 no-scrollbar animate-in fade-in duration-700">
      {/* CỘT TRÊN: HERO & STATS DỌC (Tỷ lệ 62% - 38%) */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch flex-grow h-0">
        <DashboardHero name={shortName} />
        <StatGrid stats={stats} />
      </div>
      <AiInsights stats={stats} name={shortName} />
    </div>
  );
}
