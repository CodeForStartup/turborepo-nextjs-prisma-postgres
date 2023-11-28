import prisma from "database"
import { NextRequest } from "next/server"
import { z } from "zod"

import { getServerSession } from "@/utils/auth"

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  const session = await getServerSession()
  if (!session) {
    return new Response(null, { status: 403 })
  }
  const data = await request.json()

  const userId = session?.user?.id

  try {
    if (data.action === "LIKE" || data.action === "BOOKMARK") {
      await prisma.post.update({
        where: {
          id: params?.postId,
        },
        data: {
          postOnUser: {
            create: [
              {
                type: data.action,
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            ],
          },
        },
      })
    }

    if (data.action === "UNLIKE" || data.action === "UNBOOKMARK") {
      await prisma.postOnUser.deleteMany({
        where: {
          postId: data?.postId,
          userId,
          type: data.action === "UNLIKE" ? "LIKE" : "BOOKMARK",
        },
      })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(error, { status: 500 })
  }
}
