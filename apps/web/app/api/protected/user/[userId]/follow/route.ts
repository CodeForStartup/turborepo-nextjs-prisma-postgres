import { NextRequest } from "next/server"

import prisma from "database"

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; targetUserId: string; action: string } }
) {
  const { userId, targetUserId, action } = params
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } })

    if (!user || !targetUser) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    if (action === "follow") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          followers: {
            connect: { id: targetUserId },
          },
        },
      })
    } else if (action === "unfollow") {
      await prisma.user.update({
        where: { id: userId },
        data: { following: { disconnect: { id: Number(targetUserId) } } },
      })
    } else {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    Response.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
