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
            followingId: userId,
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
