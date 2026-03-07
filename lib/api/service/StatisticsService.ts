import { TodoRepository } from "../repositories/TodoRepository";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isSameDay,
  isSameMonth,
} from "date-fns";

export class StatisticsService {
  private todoRepo = new TodoRepository();

  async getTodoStats(userId: number, type: "week" | "month" | "year") {
    const now = new Date();
    let start: Date, end: Date;

    // Xác định mốc thời gian
    if (type === "week") {
      start = startOfWeek(now, { weekStartsOn: 1 });
      end = endOfWeek(now, { weekStartsOn: 1 });
    } else if (type === "month") {
      start = startOfMonth(now);
      end = endOfMonth(now);
    } else {
      start = startOfYear(now);
      end = endOfYear(now);
    }

    const todos = await this.todoRepo.findByDateRange(userId, start, end);

    // Gom nhóm dữ liệu theo Năm hoặc Tuần/Tháng
    const interval =
      type === "year"
        ? eachMonthOfInterval({ start, end })
        : eachDayOfInterval({ start, end });

    return interval.map((date) => {
      const filtered = todos.filter((t) =>
        type === "year"
          ? isSameMonth(new Date(t.targetDate), date)
          : isSameDay(new Date(t.targetDate), date),
      );

      const completed = filtered.filter((t) => t.status).length;
      const total = filtered.length;

      return {
        name: format(date, type === "year" ? "MMM" : "dd/MM"),
        completed,
        uncompleted: total - completed,
        total,
        rateCompleted: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    });
  }
}
