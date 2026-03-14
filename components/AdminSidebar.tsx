"use client";

import { 
  Users, 
  Activity, 
  BarChart3, 
  LogOut, 
  LayoutDashboard 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import axios from "axios"; 

const adminMenuItems = [
  {
    title: "Tổng quan",
    icon: <LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    title: "Quản lý tài khoản",
    icon: <Users size={20} />,
    path: "/admin/users",
  },
  {
    title: "Theo dõi hoạt động",
    icon: <Activity size={20} />,
    path: "/admin/activities",
  },
  {
    title: "Thống kê & Báo cáo",
    icon: <BarChart3 size={20} />,
    path: "/admin/reports",
  },
];

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      router.push("/");
    }
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col p-4">
      <div className="text-xl font-bold mb-8 px-2 text-yellow-500">
        ADMIN PANEL
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {adminMenuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Thêm onClick vào đây */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 mt-auto text-red-400 hover:bg-slate-800 rounded-lg transition-colors w-full text-left"
      >
        <LogOut size={20} />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}