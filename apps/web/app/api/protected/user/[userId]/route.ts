import { NextRequest } from "next/server"

import { userSelect } from "@/types/users"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  if (!params.userId) {
    return Response.json({
      status: 400,
      message: "User id is required",
    })
  }

  try {
    const user = await prisma.user.findFirst({
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

    if (!user)
      return Response.json({
        status: 404,
        message: "User not found",
      })

    return Response.json(user, { status: 200 })
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
