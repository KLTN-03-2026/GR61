export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Tổng quan hệ thống</h1>
      
      {/* 4 cái Card thống kê nhanh cho đồ án thêm xịn */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Tổng học viên</p>
          <h3 className="text-2xl font-bold text-blue-600">1,250</h3>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Tài liệu đã tải</p>
          <h3 className="text-2xl font-bold text-green-600">456</h3>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Hoạt động hôm nay</p>
          <h3 className="text-2xl font-bold text-orange-600">89</h3>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Tỉ lệ phản hồi AI</p>
          <h3 className="text-2xl font-bold text-purple-600">98%</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400 border-dashed border-2">
        Khu vực biểu đồ (Sẽ dùng Recharts sau này)
      </div>
    </div>
  );
}