"use client";
import { useState, useEffect, useCallback } from "react";
import { useAxios } from "@/lib/hooks/useAxios";

export function useDocument() {
  // Không cần truyền userId vào đây nữa
  const [documents, setDocuments] = useState<any[]>([]);
  const { fetchData, loading } = useAxios();

  const loadDocs = useCallback(async () => {
    // Gọi API chung, Server sẽ tự lấy ID từ Header
    const res = await fetchData("GET", "/api/documents");
    if (res) setDocuments(res as any[]);
  }, [fetchData]);

  const addDoc = async (docData: any) => {
    const res = await fetchData("POST", "/api/documents", docData);
    if (res) await loadDocs();
  };

  const removeDoc = async (id: number) => {
    await fetchData("DELETE", `/api/documents/${id}`);
    await loadDocs();
  };

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);

  return { documents, addDoc, removeDoc, loading };
}
