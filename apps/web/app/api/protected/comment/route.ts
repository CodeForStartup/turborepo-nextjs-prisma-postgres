import { NextRequest } from "next/server"

import { auth } from "configs/auth"
import prisma from "database"
import { z } from "zod"

import { commentSelect } from "@/types/comment"

export async function POST(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) return Response.error()

  const data = await request.json()

  const { comment, postId } = z
    .object({
      comment: z.string().min(1).max(255),
      postId: z.string().min(1).max(255),
    })
    .parse(data)

  const result = await prisma.comment.create({
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
    select: commentSelect,
  })

  return Response.json({ message: "Success", data: result })
}
