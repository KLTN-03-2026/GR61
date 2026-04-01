import { useState } from "react";
import { X, Plus, Trash2, Edit3, Check } from "lucide-react";

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  syncCategories,
}: any) {
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("#ffffff");
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Xử lý cả THÊM MỚI và CẬP NHẬT
  const handleSave = () => {
    if (!newCatName.trim()) return;

    if (editingId) {
      // Đang ở chế độ Sửa
      const updatedCats = categories.map((c: any) =>
        c.id === editingId
          ? { ...c, name: newCatName.toUpperCase(), color: newCatColor }
          : c,
      );
      syncCategories(updatedCats);
      setEditingId(null); // Reset
    } else {
      // Tạo mới
      const newCat = {
        id: Date.now().toString(),
        name: newCatName.toUpperCase(),
        color: newCatColor,
      };
      syncCategories([...categories, newCat]);
    }

    setNewCatName("");
    setNewCatColor("#ffffff");
  };

  const handleEditClick = (cat: any) => {
    setNewCatName(cat.name);
    setNewCatColor(cat.color);
    setEditingId(cat.id);
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Xóa thể loại này? Các ghi chú cũ vẫn sẽ giữ nguyên chữ, chỉ mất màu.",
      )
    ) {
      syncCategories(categories.filter((c: any) => c.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md border-4 border-black rounded-[32px] shadow-[16px_16px_0px_0px_#000] p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-red-500 hover:text-white border-2 border-black rounded-xl"
        >
          <X size={20} strokeWidth={3} />
        </button>
        <h2 className="text-2xl font-black uppercase italic mb-6">
          Quản Lý Thể Loại
        </h2>

        {/* Form Nhập liệu */}
        <div className="flex gap-2 mb-6 p-4 bg-slate-50 border-2 border-black rounded-2xl">
          <input
            type="color"
            value={newCatColor}
            onChange={(e) => setNewCatColor(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer border-2 border-black"
          />
          <input
            type="text"
            placeholder="Tên loại..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 p-2 border-2 border-black rounded-xl font-bold uppercase"
          />
          <button
            onClick={handleSave}
            className={`p-3 text-white rounded-xl border-2 border-black transition-colors ${editingId ? "bg-green-600 hover:bg-green-700" : "bg-black hover:bg-slate-800"}`}
          >
            {editingId ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>

        {/* Danh sách */}
        <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3 border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_#000]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-black"
                  style={{ backgroundColor: cat.color }}
                ></div>
                <span className="font-black uppercase italic">{cat.name}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditClick(cat)}
                  className="text-slate-500 hover:text-blue-600 p-2"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
