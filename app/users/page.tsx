import React from "react";
import {
  Calendar,
  CheckCircle2,
  BarChart3,
  BrainCircuit,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* --- Header/Navigation --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BrainCircuit className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                SmartPath AI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition">
                Tính năng
              </a>
              <a href="#about" className="hover:text-blue-600 transition">
                Về hệ thống
              </a>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
            Hệ sinh thái học tập All-in-one
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Tối ưu hóa lộ trình học tập <br />
            <span className="text-blue-600">bằng Trí tuệ nhân tạo</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Hệ thống thông minh giúp bạn quản lý thời gian, lập kế hoạch chi
            tiết và tối đa hóa hiệu suất học tập cá nhân dựa trên dữ liệu thực
            tế.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
              Bắt đầu học ngay <ArrowRight size={20} />
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
              Xem bản Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- Main Features Grid --- */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Tính năng trình diễn cốt lõi
            </h2>
            <p className="text-slate-600">
              Công cụ chuyên nghiệp giúp bạn làm chủ kiến thức
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Thời gian biểu thông minh
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Quản lý lịch học theo ngày, tuần, tháng với tính năng kéo thả
                mượt mà. Tích hợp đồng bộ hóa giúp bạn không bỏ lỡ lịch trình.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">To-do List ưu tiên</h3>
              <p className="text-slate-600 leading-relaxed">
                Chia nhỏ công việc hàng ngày, thiết lập độ ưu tiên thông minh
                giúp bạn tập trung vào những việc quan trọng nhất.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Thống kê học tập</h3>
              <p className="text-slate-600 leading-relaxed">
                Phân tích dữ liệu từ To-do list để đưa ra biểu đồ tiến độ, giúp
                bạn nhìn lại quá trình nỗ lực của bản thân.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Flashcard & Kiểm tra</h3>
              <p className="text-slate-600 leading-relaxed">
                Ôn tập kiến thức qua thẻ ghi nhớ và các bài kiểm tra tính thời
                gian, tăng khả năng phản xạ và ghi nhớ lâu.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Chatbot AI Hỗ trợ</h3>
              <p className="text-slate-600 leading-relaxed">
                Trợ lý ảo túc trực 24/7 giải đáp thắc mắc và gợi ý tài liệu học
                tập phù hợp với trình độ của bạn.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Ghi chú đa năng</h3>
              <p className="text-slate-600 leading-relaxed">
                Lưu trữ mọi ý tưởng và kiến thức quan trọng một cách hệ thống,
                hỗ trợ định dạng chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Admin/User Role Section --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Phân quyền thông minh cho hệ thống
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1 bg-blue-100 p-1 rounded-full text-blue-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Dành cho Học viên</h4>
                  <p className="text-slate-600">
                    Trải nghiệm toàn bộ hệ sinh thái học tập, quản lý cá nhân và
                    tương tác với AI.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-1 rounded-full text-slate-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Dành cho Quản trị viên</h4>
                  <p className="text-slate-600">
                    Quản lý tài khoản, giám sát hệ thống và tối ưu hóa trải
                    nghiệm người dùng.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 italic">
              Mục tiêu của chúng tôi
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Xây dựng một môi trường số mà ở đó mỗi học viên đều có một người
              đồng hành thông minh, giúp biến những mục tiêu khó khăn thành một
              lộ trình thực hiện rõ ràng và khả thi.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full"></div>
              <div>
                <p className="font-bold">Trần Duy Dũng</p>
                <p className="text-sm text-blue-200">
                  Software Engineering Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 SmartPath AI - Đồ án tốt nghiệp Đại học Duy Tân</p>
          <p className="text-sm mt-2">
            Phát triển bởi Trần Duy Dũng - Chuyên ngành Công nghệ Phần mềm
          </p>
        </div>
      </footer>
    </div>
  );
}
