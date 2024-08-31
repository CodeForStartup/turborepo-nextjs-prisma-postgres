import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      // password: "password",
    },
  })
}

main().then(() => {
  console.log("User created successfully")
})
