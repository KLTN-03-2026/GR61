import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Đảm bảo đường dẫn migrations khớp với thư mục bạn đang làm việc
  migrations: {
    path: "prisma/migrations",
  },
  // 'classic' là lựa chọn an toàn cho MySQL local
  engine: "classic", 
  datasource: {
    url: env("DATABASE_URL"),
  },
});