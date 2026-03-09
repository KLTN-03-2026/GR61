import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f({
    pdf: { maxFileSize: "16MB" },
    blob: { maxFileSize: "16MB" }, // Blob dùng cho Word, Excel, PPT
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload hoàn tất. URL file tại Cloud:", file.url);
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
