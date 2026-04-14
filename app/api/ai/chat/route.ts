process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
    console.log("--- CHECK DATA ---");
    console.log("User ID:", userId);
    console.log("API Key tồn tại không:", !!process.env.GEMINI_API_KEY);
    const apiKey = process.env.GEMINI_API_KEY; 
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Lấy lịch sử chat
    const oldMessages = await prisma.chatHistory.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'asc' },
      take: 5 
    });

    const systemInstruction = `Bạn là "Smart Study AI". 
      QUY TẮC PHẢN HỒI:
      1. Trả lời cực kỳ NGẮN GỌN, NHANH (không quá 3-4 câu).
      2. KHÔNG Markdown (** hoặc #). Dùng VIẾT HOA để nhấn mạnh.
      3. Luôn giữ phong cách thân thiện, xưng "Tui", gọi "Bạn".
  
      HƯỚNG DẪN HỆ THỐNG:
      - Tạo Flashcard: Menu Flashcard -> Nút "Tạo mới" -> Nhập mặt trước/sau -> Lưu.
      - Tải tài liệu: Menu Tài liệu -> Nút "Tải lên" -> Chọn file từ máy -> Điền tên tài liệu -> Lưu.
      - Cập nhật số điện thoại: Biểu tượng người dùng -> Số điện thoại -> Nhập số mới -> Lưu.
      - Cập nhật họ tên: Biểu tượng người dùng -> Họ tên -> Nhập tên mới -> Lưu.
      - Cập nhật email: Biểu tượng người dùng -> Email -> Nhập email mới -> Lưu.
      - Cập nhật ngày sinh: Biểu tượng người dùng -> Ngày sinh -> Nhập ngày mới -> Lưu.

      HƯỚNG DẪN DỮ LIỆU:
      - Nếu hỏi về nội dung tài liệu (tóm tắt, tìm thông tin), hãy trả về DUY NHẤT một dòng lệnh SQL theo mẫu:
        QUERY: SELECT title, content FROM document WHERE userId = ${userId} AND (title LIKE '%tên_file%' OR content LIKE '%từ_khóa%') LIMIT 1
      - Bảng Document có các cột: id, title, content, userId.
    `;

    const chatContent = [
      ...oldMessages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.message }]
      })),
      { role: "user", parts: [{ text: `${systemInstruction}\n\nCâu hỏi của người dùng: ${message}` }] }
    ];

    // Gọi AI lần 1
    const res1 = await axios.post(apiUrl, { contents: chatContent });
    
    // Kiểm tra an toàn dữ liệu trả về
    if (!res1.data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("AI không trả về nội dung");
    }
    
    let aiResponse = res1.data.candidates[0].content.parts[0].text;

    // Xử lý SQL 
    if (aiResponse.includes("QUERY:")) {
      try {
        let sql = aiResponse.split("QUERY:")[1].trim()
                   .replace(/```sql|```/g, "")
                   .replace(/;/g, "");
        
        console.log("AI ĐANG TRUY VẤN SQL:", sql);
        const dbData = await prisma.$queryRawUnsafe(sql) as any[];

        let contextForAI = "";
        if (!dbData || dbData.length === 0) {
            contextForAI = "Tui đã tìm trong kho nhưng không thấy tài liệu nào liên quan đến câu hỏi của Bạn.";
        } else {
            const title = dbData[0].title || "Không tên";
            const content = dbData[0].content || "";
            // Cắt nội dung còn 8000 ký tự để tránh lỗi "Payload Too Large" (413)
            contextForAI = `NỘI DUNG TỪ FILE "${title}": ${content.substring(0, 8000)}`;
        }
        
        const res2 = await axios.post(apiUrl, {
          contents: [
            ...chatContent,
            { role: "model", parts: [{ text: aiResponse }] },
            { role: "user", parts: [{ text: `${contextForAI}\n\nBạn hãy dựa vào nội dung tui vừa tìm được để trả lời câu hỏi ban đầu của tui thật thân thiện và súc tích nhé.` }] }
          ]
        });
        aiResponse = res2.data.candidates[0].content.parts[0].text;
      } catch (e: any) {
        console.error("LỖI SQL HOẶC AI LẦN 2:", e.message);
        aiResponse = "Tui gặp chút rắc rối khi lục lại bộ nhớ tài liệu. Bạn thử hỏi lại kiểu khác xem!";
      }
    }
    // Lưu lịch sử (CreateMany)
    await prisma.chatHistory.createMany({
      data: [
        { userId: Number(userId), role: "user", message: message },
        { userId: Number(userId), role: "model", message: aiResponse }
      ]
    })
    // Kiểm tra tổng số tin nhắn của user này
    const chatCount = await prisma.chatHistory.count({
      where: { userId: Number(userId) }
    });
    return NextResponse.json({ reply: aiResponse });
    } catch (error: any) {
    console.log("LỖI TỔNG:", error.response?.data || error.message);
    return NextResponse.json({ reply: "Server AI đang bận tí bạn ơi, đợi vài giây thử lại nhé!" }, { status: 500 });
  }
}