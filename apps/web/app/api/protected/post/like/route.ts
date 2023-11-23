import prisma from "database"
import { z } from "zod"

import { getServerSession } from "@/utils/auth"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return new Response(null, { status: 403 })
  }
  const data = await request.json()

  const userId = session?.user?.id

  try {
    if (data.action === "like") {
      await prisma.post.update({
        where: {
          id: data?.postId,
        },
        data: {
          postOnUser: {
            create: [
              {
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
    } else {
      await prisma.post.update({
        where: {
          id: data?.postId,
        },
        data: {
          postOnUser: {
            delete: {
              userId_postId: {
                userId,
                postId: data?.postId,
              },
            },
          },
        },
      })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
