import { Star, Edit3, Trash2 } from "lucide-react";

export default function NoteCard({
  note,
  categories,
  onEdit,
  onDelete,
  onTogglePin,
  onView,
}: any) {
  const categoryInfo = categories.find((c: any) => c.name === note.category);
  const bgColor = categoryInfo ? categoryInfo.color : "#ffffff";

  return (
    <div
      onClick={() => onView(note)}
      style={{ backgroundColor: bgColor }}
      className="group relative flex flex-col h-full p-6 border-[3px] border-black rounded-[24px] shadow-[8px_8px_0px_0px_#000] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-white border-2 border-black rounded-lg font-black text-[10px] uppercase italic truncate max-w-[120px]">
          {note.category}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id, note.isPinned);
          }}
          className={`p-2 border-2 border-black rounded-full transition-all bg-white hover:scale-110 active:scale-95 flex-shrink-0 ${
            note.isPinned
              ? "text-yellow-500 shadow-[2px_2px_0px_0px_#000]"
              : "text-slate-300 hover:text-black"
          }`}
        >
          <Star
            size={16}
            strokeWidth={3}
            fill={note.isPinned ? "currentColor" : "none"}
          />
        </button>
      </div>

      <h3 className="text-xl font-black uppercase italic mb-2 line-clamp-2 leading-tight text-black">
        {note.title}
      </h3>

      <p className="text-sm font-bold text-slate-800 line-clamp-4 mb-6 whitespace-pre-wrap flex-1">
        {note.content}
      </p>

      <div className="flex justify-between items-center pt-4 border-t-2 border-black/10 mt-auto">
        <span className="text-[10px] font-black text-black/50 uppercase italic">
          {new Date(note.updatedAt).toLocaleDateString("vi-VN")}
        </span>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-2 bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_#000] active:scale-95 transition-all"
          >
            <Edit3 size={14} strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-2 bg-white border-2 border-black rounded-xl hover:bg-red-500 hover:text-white shadow-[2px_2px_0px_0px_#000] active:scale-95 transition-all"
          >
            <Trash2 size={14} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
