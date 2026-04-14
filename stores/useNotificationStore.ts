import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (title: string, message: string) => void;
  markAsRead: (id: string) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  
  addNotification: (title, message) => {
    const newNoti = {
      id: Math.random().toString(36).substring(7),
      title,
      message,
      createdAt: new Date(),
      isRead: false,
    };
    set((state) => ({
      notifications: [newNoti, ...state.notifications].slice(0, 20), 
    }));
  },

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => 
      n.id === id ? { ...n, isRead: true } : n
    ),
  })),

  unreadCount: () => get().notifications.filter(n => !n.isRead).length,
}));