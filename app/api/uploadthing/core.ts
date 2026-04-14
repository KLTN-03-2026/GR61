import { createUploadthing, type FileRouter } from "uploadthing/next";
import { extractOnlyText } from "@/lib/extractor";
import prisma from "@/lib/prisma";
import { notificationService } from "@/lib/notification-service";

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
      const newDoc = await prisma.document.create({
      data: {
        title: file.name,
        fileUrl: file.url,
        fileType: file.name.split('.').pop()?.toUpperCase() || "DOCX",
        fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
        userId: metadata.userId,
        content: "Đang xử lý..." 
        },
      });
      await notificationService.create({
      userId: metadata.userId,
      title: "TẢI TÀI LIỆU",
      message: `File "${file.name}" đã được tải lên....`,
      type: "SUCCESS"
      });
      extractOnlyText(file.url, file.name, file.type).then(async (content) => {
        await prisma.document.update({
        where: { id: newDoc.id },
        data: { content: content }
      });
    });
    return { success: true };
})
} satisfies FileRouter;