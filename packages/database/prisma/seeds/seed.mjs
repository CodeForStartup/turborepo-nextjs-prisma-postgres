import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "admin@codeforstartup.com",
    },
    create: {
      name: "Luan Nguyen",
      email: "admin@codeforstartup.com",
      password: "12345678",
    },
    update: {},
  })

  console.log("seed-user:", { user })
}

main().then(() => {
  console.log("User created successfully")
})
