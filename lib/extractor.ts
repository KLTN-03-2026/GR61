import * as mammoth from "mammoth";
import prisma from "@/lib/prisma";

import * as pdf from "pdf-parse";

if (typeof window === "undefined") {
  (global as any).DOMMatrix = class {};
}

export async function extractOnlyText(
  fileUrl: string,
  fileName: string,
  fileType: string,
) {
  try {
    console.log("Đang fetch file từ:", fileUrl);
    const response = await fetch(encodeURI(fileUrl));
    if (!response.ok) throw new Error("Fetch file failed");

    const buffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    let content = "";
    const typeLower = (fileType || "").toLowerCase();
    const nameLower = fileName.toLowerCase();

    // Xử lý PDF
    if (typeLower.includes("pdf") || nameLower.endsWith(".pdf")) {
      console.log("Đang xử lý PDF...");

      const data = await (pdf as any)(fileBuffer);
      content = data.text;
    } else if (
      nameLower.endsWith(".docx") ||
      typeLower.includes("word") ||
      typeLower.includes("officedocument") ||
      typeLower === "blob"
    ) {
      console.log(" Đang xử lý DOCX...");
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      content = result.value;
    } else {
      console.log(" Định dạng không xác định, đọc thô...");
      content = fileBuffer.toString("utf8").slice(0, 5000);
    }

    const finalContent = content.replace(/\s+/g, " ").trim();
    return finalContent || "Không có nội dung văn bản.";
  } catch (error: any) {
    console.error(" Lỗi extract:", error.message);
    return "Lỗi trích xuất: " + error.message;
  }
}
