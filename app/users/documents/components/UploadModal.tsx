"use client";
import React, { useState } from "react";
import { X, FileUp } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
// Đảm bảo đường dẫn này khớp với cấu trúc thư mục của bạn
import { type OurFileRouter } from "@/app/api/uploadthing/core";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

export function UploadModal({ isOpen, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [fileInfo, setFileInfo] = useState<{
    url: string;
    size: string;
    type: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInfo) {
      alert("Vui lòng chọn và tải file từ máy tính lên trước!");
      return;
    }

    onAdd({
      title: title || "Tài liệu không tên",
      fileUrl: fileInfo.url,
      fileType: fileInfo.type,
      fileSize: fileInfo.size,
    });

    // Reset state và đóng modal
    setTitle("");
    setFileInfo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden border-[3px] border-black transition-all">
        {/* HEADER */}
        <div className="p-6 border-b-[3px] border-black bg-green-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-green-600">
              <FileUp size={24} strokeWidth={3} />
            </div>
            <h2 className="text-xl font-black uppercase italic font-serif tracking-tighter">
              Tải tài liệu lên
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 border-2 border-transparent hover:border-black rounded-xl transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Input Tên tài liệu */}
          <div className="space-y-2">
            <label className="text-[12px] font-black uppercase italic text-slate-500 ml-1">
              Tiêu đề hiển thị
            </label>
            <input
              required
              className="w-full p-4 border-[3px] border-black rounded-2xl outline-none focus:bg-green-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
              placeholder="VD: Đồ án tốt nghiệp 2026..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* KHU VỰC CHỌN FILE TỪ MÁY TÍNH */}
          <div className="space-y-2">
            <label className="text-[12px] font-black uppercase italic text-slate-500 ml-1">
              Tệp tin từ thiết bị
            </label>
            <div className="border-[3px] border-dashed border-black p-8 rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 transition-colors">
              <UploadButton<OurFileRouter, "documentUploader">
                endpoint="documentUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    // Trích xuất metadata từ file vừa chọn trong laptop
                    setFileInfo({
                      url: res[0].url,
                      size: (res[0].size / 1024 / 1024).toFixed(2) + " MB",
                      type: res[0].name.split(".").pop() || "unknown",
                    });
                    alert("Tải lên thành công!");
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Lỗi: ${error.message}`);
                }}
                appearance={{
                  button:
                    "bg-black text-white font-black italic uppercase text-[10px] px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(22,163,74,1)] hover:bg-green-600 transition-all",
                  allowedContent:
                    "text-[10px] font-bold text-slate-400 uppercase mt-2",
                }}
              />
              {fileInfo && (
                <div className="flex items-center gap-2 bg-green-100 border-2 border-green-600 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-black text-green-700 italic uppercase">
                    Đã sẵn sàng ({fileInfo.size})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* NÚT SUBMIT */}
          <button
            type="submit"
            disabled={!fileInfo}
            className="w-full bg-green-600 text-white font-black py-4 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:shadow-none active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase italic text-sm tracking-widest"
          >
            Lưu vào hệ thống
          </button>
        </form>
      </div>
    </div>
  );
}
