import { toast } from "sonner";
import { useNotificationStore } from "../stores/useNotificationStore";

export const notifier = {
  // 1. Thông báo thành công
  success: (message: string, description?: string) => {
    toast.success(message, {
      description: description,
      className:
        "rounded-3xl border-2 border-slate-50 font-bold italic shadow-lg bg-green-700 text-white p-4",
    });
    useNotificationStore.getState().addNotification(message, description || "Thao tác thành công");
  },

  // 2. Thông báo lỗi
  error: (message: string, description?: string) => {
    toast.error(message, {
      description: description,
      className:
        "rounded-3xl border-2 border-slate-50 font-bold italic shadow-lg bg-red-600 text-white p-4",
    });
    useNotificationStore.getState().addNotification("LỖI: " + message, description || "Vui lòng kiểm tra lại");
  },

  // 3. Thông báo cảnh báo
  warn: (message: string) => {
    toast.warning(message, {
      className:
        "rounded-3xl border-2 border-slate-50 font-bold italic shadow-lg bg-yellow-600 text-white p-4",
    });
    useNotificationStore.getState().addNotification("CẢNH BÁO", message);
  },

  // 4. Thông báo dạng chờ (Promise - Dùng khi gọi API hoặc tải file)
  promise: <T>(promise: Promise<T>, loadingMsg: string, successMsg: string) => {
    return toast.promise(promise, {
      loading: loadingMsg,
      success: (data) => {
        useNotificationStore.getState().addNotification(successMsg, "Thao tác đã hoàn tất.");
        return successMsg;
      },
      error: (err: unknown) => {
        const errorDetail = err instanceof Error ? err.message : String(err);
        const finalError = `Lỗi: ${errorDetail}`;
        useNotificationStore.getState().addNotification("THẤT BẠI", finalError);
        return finalError;
      },
      className:
        "rounded-3xl border-2 border-slate-50 font-bold italic shadow-lg bg-blue-600 text-white p-4",
    });
  },
};
