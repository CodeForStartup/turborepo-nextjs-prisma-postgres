import { NextRequest } from "next/server"

import { userSelect } from "@/types/users"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const post = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: params.userId,
          },
          {
            username: params.userId,
          },
        ],
      },
      select: userSelect,
    })

    if (!post)
      return Response.json({
        status: 404,
        message: "User not found",
      })

    return Response.json(post, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  const data = await request.json()
  try {
    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data,
    })

    if (!user) {
      return Response.json({
        status: 404,
        message: "User not found",
      })
    }

    return Response.json(user, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}
