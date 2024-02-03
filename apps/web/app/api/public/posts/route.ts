import prisma, { PostStatus, Prisma } from "database"
import dayjs from "dayjs"
import { NextRequest } from "next/server"

import { FilterValues, PeriodValues } from "@/types/filter"
import { postSelect } from "@/types/posts"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const tag = newUrl.searchParams.get("tag") || ""
  const filter = newUrl.searchParams.get("filter") || FilterValues.LASTED // lasted or hot
  const period = newUrl.searchParams.get("period") || PeriodValues.INFINITY // lasted or hot
  const limit = newUrl.searchParams.get("limit") || 10
  const page = newUrl.searchParams.get("page") || 1
  const authorId = newUrl.searchParams.get("authorId") || ""

  let where: Prisma.PostWhereInput = {
    postStatus: PostStatus.PUBLISHED,
  }

  let orderBy = {}

  if (authorId) {
    where = {
      ...where,
      authorId,
    }
  }

  if (filter === FilterValues.HOT) {
    if (period === PeriodValues.THIS_MONTH) {
      where = {
        ...where,
        updatedAt: {
          gte: dayjs().subtract(30, "day").toDate(),
        },
      }
    }

    if (period === PeriodValues.THIS_WEEK) {
      where = {
        ...where,
        updatedAt: {
          gte: dayjs().subtract(7, "day").toDate(),
        },
      }
    }

    orderBy = {
      ...orderBy,
      comments: {
        _count: "desc",
      },
    }
  }

  if (filter === FilterValues.LASTED) {
    orderBy = {
      ...orderBy,
      updatedAt: "desc",
    }
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
        orderBy,
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
