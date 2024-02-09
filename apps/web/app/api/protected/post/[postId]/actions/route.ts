import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

import prisma from "database"
import { z } from "zod"

import APP_APIS from "@/constants/apis"
import { getServerSession } from "@/utils/auth"
import { generatePath } from "@/utils/generatePath"

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

    revalidatePath(generatePath(APP_APIS.public.posts.GET))
    revalidatePath(generatePath(APP_APIS.public.post.GET, { postIdOrSlug: params?.postId }))

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(error, { status: 500 })
  }
}
