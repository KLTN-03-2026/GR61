import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient(); // Prisma 7 tự động đọc từ prisma.config.ts

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
