// prisma.config.ts
import { defineConfig } from "@prisma/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not defined in your environment variables (.env)"
  );
}

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
  // Đổi từ "library" thành "classic" để khớp với kiểu dữ liệu của Prisma 7
  engine: "classic",
});
