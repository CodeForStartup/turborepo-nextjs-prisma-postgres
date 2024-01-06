import prisma, { Prisma } from "database"
import { NextRequest } from "next/server"

import { commentSelect } from "@/types/comment"

export async function GET(request: NextRequest, { params }: { params: { postIdOrSlug: string } }) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const limit = newUrl.searchParams.get("limit") || 10
  const page = newUrl.searchParams.get("page") || 1

  let where: Prisma.CommentWhereInput = {
    commentOnPostId: params.postIdOrSlug,
  }

  if (searchTerm) {
    where = {
      ...where,
      content: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }
  }

  try {
    const [total, comments] = await Promise.all([
      prisma.comment.count({ where }),
      prisma.comment.findMany({
        where,
        select: commentSelect,
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
      }),
    ])

    return Response.json({
      data: comments,
      total,
      page: Number(page),
      limit: Number(limit),
    })
  } catch (error) {
    throw error
  }
}
