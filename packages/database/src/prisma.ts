// https://github.com/prisma/prisma/issues/1983#issuecomment-620621213

import { PrismaClient } from "@prisma/client"

declare global {
  const prisma: PrismaClient | undefined
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined
    }
  }
}

// const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log: ["info", "warn", "error", "query"],
//   })

// if (process.env.NODE_ENV === "development") global.prisma = prisma

// const prisma = new PrismaClient({
//   log: ["info", "warn", "error", "query"],
// })

// export default prisma

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma
