import { NextRequest } from "next/server"

import prisma from "database"

import { getServerSession } from "@/utils/auth"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params

  const session = await getServerSession()
  if (!session) {
    return new Response(null, { status: 403 })
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    })

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(user, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params
  const data = await request.json()

  const session = await getServerSession()
  if (!session) {
    return new Response(null, { status: 403 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const targetUser = await prisma.user.findUnique({ where: { id: data?.targetUserId } })

    if (!user || !targetUser) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    if (data?.action === "follow") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          followers: {
            connect: {
              followerId_followingId: {
                followerId: userId,
                followingId: data?.targetUserId,
              },
            },
          },
        },
      })
    } else if (data?.action === "unfollow") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          followers: {
            disconnect: {
              followerId_followingId: {
                followerId: userId,
                followingId: data?.targetUserId,
              },
            },
          },
        },
      })
    } else {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    Response.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
