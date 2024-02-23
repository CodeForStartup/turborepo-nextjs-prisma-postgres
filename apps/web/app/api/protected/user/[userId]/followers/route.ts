import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

import prisma from "database"

import { getServerSession } from "@/utils/auth"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params

  try {
    const users = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    })

    if (!users) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(users, { status: 200 })
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
    const targetUser = await prisma.user.findUnique({ where: { id: data?.followerId } })

    if (!user || !targetUser) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    const isFollowing = await prisma.follower.findFirst({
      where: {
        followerId: userId,
        followingId: data?.followerId,
      },
    })

    if (!isFollowing) {
      await prisma.follower.upsert({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: data?.followerId,
          },
        },
        update: {},
        create: {
          followerId: userId,
          followingId: data?.followerId,
        },
      })
    } else {
      await prisma.follower.deleteMany({
        where: {
          followerId: userId,
          followingId: data?.followerId,
        },
      })
    }
    revalidatePath(`/author/${userId}/followers`)

    return Response.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
