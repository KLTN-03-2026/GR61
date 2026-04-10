import { createUploadthing, type FileRouter } from "uploadthing/next";
import { extractOnlyText } from "@/lib/extractor";
import prisma from "@/lib/prisma";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f({
    pdf: { maxFileSize: "16MB" },
    blob: { maxFileSize: "16MB" }, // Blob dùng cho Word, Excel, PPT
  }).middleware(async ({ req }) => {
      // Tạm thời lấy ID từ một nguồn nào đó hoặc để cứng để test
      // Nếu bro dùng Clerk hay Auth.js thì lấy ở đây
      return { userId: 2 }; 
    })
  .onUploadComplete(async ({ metadata, file }) => {
      console.log("Đang xử lý file:", file.name);
      const textContent = await extractOnlyText(file.url, file.name, file.type);
      let displayType = file.type;
      if (file.name.toLowerCase().endsWith(".pdf")) displayType = "PDF";
      else if (file.name.toLowerCase().endsWith(".docx")) displayType = "DOCX";
      else displayType = "DOC"
      
      // 🔥 Gọi hàm trích xuất (Không dùng await để nó chạy ngầm, không làm chậm upload)
      try {
      const textContent = await extractOnlyText(file.url, file.name, file.type);
      console.log("Độ dài chữ:", textContent?.length || 0);
      const newDoc = await prisma.document.create({
        data: {
          title: file.name,
          fileUrl: file.url,
          fileType: file.type || "unknown",
          fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
          content: textContent,
          userId: metadata.userId,
        },
      });
    console.log("Đã lưu vào DB thành công!", newDoc.id);
  } catch (error: any) {
    console.error("Lỗi tại core.ts:", error.message);
  }

  return { uploadedBy: metadata.userId };
})
} satisfies FileRouter;