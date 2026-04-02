"use client";
import React, { useState, useMemo } from "react";
import { Plus, Settings2, Filter } from "lucide-react";
import { useNote } from "./hooks/useNote";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import CategoryModal from "./components/CategoryModal";
import NoteDetailModal from "./components/NoteDetailModal";

export default function NotePage() {
  const {
    notes,
    isLoading,
    categories,
    syncCategories,
    togglePin,
    deleteNote,
    saveNote,
  } = useNote();

  const [activeCategory, setActiveCategory] = useState("ALL");

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const [editingNote, setEditingNote] = useState<any>(null);
  const [viewingNote, setViewingNote] = useState<any>(null);

  const filteredNotes = useMemo(() => {
    return notes
      .filter(
        (n: any) => activeCategory === "ALL" || n.category === activeCategory,
      )

      .sort((a: any, b: any) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
  }, [notes, activeCategory]);

  if (isLoading && notes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse text-2xl uppercase">
        Đang tải Ghi chú...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen no-scrollbar animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b-4 border-black pb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">
            Kho Ghi Chú
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-4 py-3 bg-white text-black border-[3px]  border-black rounded-2xl font-black uppercase italic shadow-[4px_4px_0px_0px_#000] cursor-pointer focus:outline-none"
          >
            <option value="ALL">THỂ LOẠI</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsCatModalOpen(true)}
            className="p-3 bg-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:bg-slate-100 flex items-center justify-center transition-all"
          >
            <Settings2 size={24} strokeWidth={3} />
          </button>

          <button
            onClick={() => {
              setEditingNote(null);
              setIsNoteModalOpen(true);
            }}
            className="px-6 py-3 bg-green-500 text-white font-black uppercase italic border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:bg-green-600 flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={20} strokeWidth={4} /> Tạo mới
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {filteredNotes.map((note: any) => (
          <div key={note.id} className="h-full">
            <NoteCard
              note={note}
              categories={categories}
              onView={(n: any) => setViewingNote(n)}
              onEdit={(n: any) => {
                setEditingNote(n);
                setIsNoteModalOpen(true);
              }}
              onDelete={deleteNote}
              onTogglePin={togglePin}
            />
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-[3px] border-dashed border-slate-300 rounded-[32px] bg-slate-50">
            <Filter size={48} className="text-slate-300 mb-4" />
            <p className="text-xl font-black text-slate-400 uppercase italic">
              Không tìm thấy ghi chú nào
            </p>
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={saveNote}
        editingNote={editingNote}
        categories={categories}
      />

      <CategoryModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        categories={categories}
        syncCategories={syncCategories}
      />

      <NoteDetailModal
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        note={viewingNote}
        categories={categories}
      />
    </div>
  );
}
