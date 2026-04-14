import { prisma } from "@/lib/prisma";

export const notificationService = {
  // Hàm này chuyên dùng để ghi nhật ký vào DB
  async create({ userId, title, message, type = "INFO" }: { 
    userId: number, 
    title: string, 
    message: string, 
    type?: "SUCCESS" | "WARN" | "ERROR" | "INFO" 
  }) {
    try {
      return await prisma.notification.create({
        data: {
          userId,
          title,
          message,
          type,
        },
      });
    } catch (error) {
      console.error("Lỗi lưu thông báo vào DB:", error);
    }
  }
};