"use client";
import { useStatistics } from "./hooks/useStatistics";
import StatisticsFilter from "./components/StatisticsFilter";
import QuantityChart from "./components/QuantityChart";
import RateChart from "./components/RateChart";

export default function StatisticsPage() {
  const { period, setPeriod, view, setView, data, isLoading } = useStatistics();

  return (
    <main className="h-screen w-full bg-white p-8 overflow-hidden flex flex-col text-black">
      {/* Tiêu đề giữ nguyên tỷ lệ để dễ đọc */}
      <h1 className="text-5xl font-black  text-center uppercase tracking-tighter italic  pb-2">
        Thống kê kết quả
      </h1>

      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Thanh lọc bên trái giữ nguyên 100% để dễ tương tác */}
        <StatisticsFilter
          period={period}
          setPeriod={setPeriod}
          view={view}
          setView={setView}
        />

        {/* KHU VỰC BIỂU ĐỒ: Thu nhỏ 80% */}
        <div className="flex-1 flex items-center justify-center overflow-hidden]">
          <section className="w-full h-full bg-white border-4 border-black p-4 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col transform scale-85 origin-center transition-transform duration-300">
            {isLoading ? (
              <div className="h-full flex items-center justify-center font-black animate-pulse uppercase text-slate-300 italic">
                Đang tổng hợp dữ liệu...
              </div>
            ) : (
              <div className="flex-1 w-full h-full">
                {view === "quantity" ? (
                  <QuantityChart data={data} />
                ) : (
                  <RateChart data={data} />
                )}
              </div>
            )}

            {/* Tag trang trí góc cho đỡ trống khi thu nhỏ */}
            <div className="absolute -top-3 -right-3 bg-yellow-400 border-2 border-black px-3 py-1 font-black text-[10px] uppercase italic rounded-lg shadow-[2px_2px_0px_0px_#000]">
              Cố lên nhé !!!
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
