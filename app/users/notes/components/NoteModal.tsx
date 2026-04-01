import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  editingNote,
  categories,
}: any) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        category: editingNote.category,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        category: categories[0]?.name || "",
      });
    }
  }, [editingNote, isOpen, categories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg border-4 border-black rounded-[32px] shadow-[16px_16px_0px_0px_#000] p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-red-500 hover:text-white border-2 border-black rounded-xl"
        >
          <X size={20} strokeWidth={3} />
        </button>
        <h2 className="text-3xl font-black uppercase italic mb-6">
          {editingNote ? "Sửa Ghi Chú" : "Ghi Chú Mới"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...formData, id: editingNote?.id });
            onClose();
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-xs font-black uppercase italic mb-2">
              Phân loại
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-3 border-2 border-black rounded-xl font-bold uppercase text-sm shadow-[4px_4px_0px_0px_#000] bg-slate-50"
            >
              {categories.map((c: any) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-black uppercase italic mb-2">
              Tiêu đề
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-4 border-2 border-black rounded-xl font-bold italic shadow-[4px_4px_0px_0px_#000] bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase italic mb-2">
              Nội dung
            </label>
            <textarea
              required
              rows={5}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full p-4 border-2 border-black rounded-xl font-bold italic shadow-[4px_4px_0px_0px_#000] bg-slate-50 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-white font-black uppercase italic border-2 border-black rounded-xl hover:bg-green-600"
          >
            {editingNote ? "Lưu Thay Đổi" : "Tạo Ghi Chú"}
          </button>
        </form>
      </div>
    </div>
  );
}
