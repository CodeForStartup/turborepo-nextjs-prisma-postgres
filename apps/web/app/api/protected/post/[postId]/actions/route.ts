import { NextRequest } from "next/server"

import prisma from "database"
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
      await prisma.postOnUser.upsert({
        where: {
          userId_postId_type: {
            postId: data?.postId,
            userId,
            type: data.action === "LIKE" ? "LIKE" : "BOOKMARK",
          },
        },
        update: {
          type: data.action === "LIKE" ? "LIKE" : "BOOKMARK",
          postId: data?.postId,
          userId,
        },
        create: {
          type: data.action === "LIKE" ? "LIKE" : "BOOKMARK",
          postId: data?.postId,
          userId,
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

    // revalidatePath(generatePath(APP_APIS.public.posts.GET))
    // revalidatePath(generatePath(APP_APIS.public.post.GET, { postIdOrSlug: params?.postId }))

    return Response.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(error, { status: 500 })
  }
}
