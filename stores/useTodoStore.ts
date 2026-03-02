import { create } from "zustand";
import { startOfWeek, addDays, format } from "date-fns";

interface TodoState {
  selectedDate: Date;
  currentWeekStart: Date;
  setSelectedDate: (date: Date) => void;
  nextWeek: () => void;
  prevWeek: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  selectedDate: new Date(),
  currentWeekStart: startOfWeek(new Date(), { weekStartsOn: 1 }), // Bắt đầu từ Thứ 2

  setSelectedDate: (date) => set({ selectedDate: date }),

  nextWeek: () =>
    set((state) => ({
      currentWeekStart: addDays(state.currentWeekStart, 7),
    })),

  prevWeek: () =>
    set((state) => ({
      currentWeekStart: addDays(state.currentWeekStart, -7),
    })),
}));
