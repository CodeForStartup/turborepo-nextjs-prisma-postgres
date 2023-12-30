import prisma, { Prisma } from "database"
import { NextRequest } from "next/server"

import { postSelect } from "@/types/posts"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const tag = newUrl.searchParams.get("tag") || ""
  const limit = newUrl.searchParams.get("limit") || 10
  const page = newUrl.searchParams.get("page") || 1

  let where: Prisma.PostWhereInput = {
    // postStatus: "PUBLISHED",
  }

  if (tag) {
    where = {
      ...where,
      tagOnPost: {
        some: {
          tag: {
            OR: [{ id: tag }, { slug: tag }],
          },
        },
      },
    }
  }

  if (searchTerm) {
    where = {
      ...where,
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    }
  }

  try {
    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        select: postSelect,
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
      }),
    ])

    return Response.json({
      data: posts,
      total,
      page: Number(page),
      limit: Number(limit),
    })
  } catch (error) {
    throw error
  }
}
