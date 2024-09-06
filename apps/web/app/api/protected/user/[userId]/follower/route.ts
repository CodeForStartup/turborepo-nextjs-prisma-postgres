import { NextRequest } from "next/server"

import { auth } from "configs/auth"
import prisma from "database"

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
          followerId: currentUser?.user?.id,
          followingId: userId,
        },
      },
    })

    return Response.json({ isFollowing: Boolean(isFollowing) }, { status: 200 })
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
