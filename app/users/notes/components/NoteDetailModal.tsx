import { X } from "lucide-react";

export default function NoteDetailModal({
  isOpen,
  onClose,
  note,
  categories,
}: any) {
  if (!isOpen || !note) return null;
  const categoryInfo = categories.find((c: any) => c.name === note.category);
  const bgColor = categoryInfo ? categoryInfo.color : "ffff";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        style={{ backgroundColor: bgColor }}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col border-4 border-black rounded-[32px] shadow-[16px_16px_0px_0px_#000] overflow-hidden relative"
      >
        {/* Nút Đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-white hover:bg-red-500 hover:text-white border-2 border-black rounded-xl transition-colors z-10 shadow-[2px_2px_0px_0px_#000]"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Header chi tiết */}
        <div className="flex justify-around p-8 pb-4 border-b-4 border-black/10">
          <span className="px-4 py-1 bg-white border-2 border-black rounded-xl font-black text-xs uppercase italic mb-4 inline-block shadow-[2px_2px_0px_0px_#000]">
            {note.category}
          </span>
          <h2 className="text-3xl md:text-3xl font-black uppercase italic leading-tight text-black pr-12">
            {note.title}
          </h2>
          <p className="text-xs font-black text-black/50 uppercase italic mt-4">
            Cập nhật lần cuối:{" "}
            {new Date(note.updatedAt).toLocaleDateString("vi-VN")}
          </p>
        </div>

        {/* Nội dung có thanh cuộn */}
        <div className="p-8 overflow-y-auto no-scrollbar flex-1">
          <p className="text-lg font-bold text-slate-900 whitespace-pre-wrap leading-relaxed">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
}
