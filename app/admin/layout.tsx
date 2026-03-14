// app/admin/layout.tsx
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar />
      
      {/* Nội dung thay đổi bên phải */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}