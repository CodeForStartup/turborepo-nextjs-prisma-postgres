import { NextRequest } from "next/server"

import prisma from "database"

import { getServerSession } from "@/utils/auth"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params

  try {
    const currentUser = await getServerSession()

    if (!currentUser) {
      return Response.json({ isFollowing: false }, { status: 200 })
    }

    const isFollowing = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: currentUser?.user?.id,
        },
      },
    })

    return Response.json({ isFollowing: !Boolean(isFollowing) }, { status: 200 })
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    )
  }
}
