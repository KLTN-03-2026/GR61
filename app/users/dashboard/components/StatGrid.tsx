"use client";
import { Calendar, CheckSquare, BarChart3, FolderRoot } from "lucide-react";

export default function StatGrid({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Calendar size={24} />}
        title="Lịch học"
        desc={`Hôm nay: ${stats.todayEvents} buổi`}
      />
      <StatCard
        icon={<CheckSquare size={24} />}
        title="Nhiệm vụ"
        desc={`${stats.todoDone} xong / ${stats.todoPending} chờ`}
      />
      <StatCard
        icon={<BarChart3 size={24} />}
        title="Hiệu suất"
        desc={`Hoàn thành ${stats.progress}%`}
      />
      <StatCard
        icon={<FolderRoot size={24} />}
        title="Flashcards"
        desc={`${stats.flashcardFolders} thư mục thẻ`}
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 border-2 border-black rounded-[24px] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
      <div className="text-green-600 mb-3">{icon}</div>
      <h3 className="text-lg font-black uppercase italic mb-1 font-serif tracking-tighter">
        {title}
      </h3>
      <p className="text-xs font-bold text-slate-400 uppercase">{desc}</p>
    </div>
  );
}
