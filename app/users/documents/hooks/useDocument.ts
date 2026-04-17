"use client";
import { useState, useEffect, useCallback } from "react";
import { useAxios } from "@/lib/hooks/useAxios";
import { notifier } from "@/lib/notifier"; 

export function useDocument() {
  const [documents, setDocuments] = useState<any[]>([]);
  const { fetchData, loading } = useAxios();

  const loadDocs = useCallback(async () => {
    const res: any = await fetchData("GET", "/api/documents");
    if (res) {
      const actualData = res.data ? res.data : res;
      if (Array.isArray(actualData)) {
      console.log("Danh sách file nhận được:", actualData);
      setDocuments(actualData);
      } else {
      console.error("Dữ liệu không phải mảng:", actualData);
    }
  }
}, [fetchData]);

  const addDoc = async (docData: any) => {
    try {
      const res = await fetchData("POST", "/api/documents", docData);
      if (res) {
        await loadDocs();
        notifier.success(
          "Lưu thành công!",
          "Tài liệu đã được thêm vào Kho số.",
        );
      }
    } catch (error) {
      notifier.error("Lỗi hệ thống!", "Không thể lưu tài liệu lúc này.");
    }
  };

  const removeDoc = async (id: number) => {
    try {
      await fetchData("DELETE", `/api/documents/${id}`);
      await loadDocs();
      notifier.warn("Tài liệu đã bị xóa khỏi hệ thống! ");
    } catch (error) {
      notifier.error("Lỗi!", "Không thể xóa tài liệu.");
    }
  };

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);

  return { 
    documents, 
    addDoc, 
    removeDoc, 
    loading, 
    mutate: loadDocs 
  };
}
