import prisma from "database"
import { NextRequest } from "next/server"
import { z } from "zod"

import { getServerSession } from "@/utils/auth"

export async function POST(request: NextRequest) {
  const session = getServerSession()

  if (!session) return Response.error()

  const { body } = request
  const { comment, postId } = z
    .object({
      comment: z.string().min(1).max(255),
      postId: z.string().uuid(),
    })
    .parse(body)

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
          slug: postId,
        },
      },
    },
  })

  return Response.json({ message: "Success" })
}
