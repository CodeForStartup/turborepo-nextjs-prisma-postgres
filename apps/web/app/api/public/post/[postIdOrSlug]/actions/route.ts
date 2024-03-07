import { NextRequest } from "next/server"

import prisma, { Prisma } from "database"

export async function GET(request: NextRequest, { params }: { params: { postIdOrSlug: string } }) {
  try {
    const result = await prisma.postOnUser.findMany({
      where: {
        postId: params.postIdOrSlug,
        type: "LIKE",
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    return Response.json(result, { status: 200 })
  } catch (error) {
    return Response.json({ status: 404, message: "Post not found" })
  }
}
