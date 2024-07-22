import { PrismaClient } from "@prisma/client"

declare global {
  const prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["info", "warn", "error", "query"],
  })

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma
