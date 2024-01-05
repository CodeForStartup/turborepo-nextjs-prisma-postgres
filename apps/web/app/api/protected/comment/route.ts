import prisma from "database"
import { NextRequest } from "next/server"
import { z } from "zod"

import { getServerSession } from "@/utils/auth"

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session?.user?.id) return Response.error()

  const data = await request.json()

  const { comment, postId } = z
    .object({
      comment: z.string().min(1).max(255),
      postId: z.string().min(1).max(255),
    })
    .parse(data)

  await prisma.comment.create({
    data: {
      content: comment,
      author: {
        connect: {
          id: session?.user?.id,
        },
      },
      parentCommentId: null,
      commentOnPost: {
        connect: {
          id: postId,
        },
      },
    },
  })

  return Response.json({ message: "Success" })
}
