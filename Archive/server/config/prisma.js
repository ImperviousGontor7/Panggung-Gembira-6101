import { PrismaClient } from "@prisma/client";
import logger from "./logger.js";

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.__imperviousPrisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__imperviousPrisma = prisma;
}

export async function connectDatabase() {
  await prisma.$connect();
  logger.info("Prisma connected");
  return prisma;
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  logger.info("Prisma disconnected");
}

export async function checkDatabase() {
  await prisma.$queryRaw`SELECT 1`;
  return true;
}

export default prisma;