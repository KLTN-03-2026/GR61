<div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #333;">Xin chào, ${updatedUser.hoTen}!</h2>
              <p style="color: #555; line-height: 1.6;">Chúng tôi thông báo về việc thay đổi trạng thái tài khoản của bạn trên hệ thống:</p>
              
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; border: 1px solid #eee;">
                <p style="margin: 0; color: #666;">Trạng thái mới:</p>
                <span style="font-size: 22px; font-weight: bold; color: ${statusColor};">${actionText}</span>
              </div>

              <p style="color: #666; font-size: 14px; font-style: italic;">
                ${isCurrentlyLocked 
                  ? "Bây giờ bạn đã có thể đăng nhập và sử dụng đầy đủ các tính năng của hệ thống." 
                  : "Nếu bạn cho rằng đây là một sự nhầm lẫn, vui lòng liên hệ với Quản trị viên qua email hỗ trợ."}
              </p>
            </div>
            <div style="background-color: #f9fafb; padding: 15px; text-align: center; color: #9ca3af; font-size: 12px;">
              <p>© 2026 Ecosystem - Hệ sinh thái Học tập Thông minh</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      newStatus: newSdtValue, // Trả về trạng thái mới để Frontend cập nhật
    });
  } catch (error) {
    console.error("Lỗi API Toggle Lock:", error);
    return NextResponse.json({ error: "Lỗi xử lý" }, { status: 500 });
  }
}