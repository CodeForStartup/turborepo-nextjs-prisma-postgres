import prisma, { Prisma } from "database"
import { NextRequest } from "next/server"

import { DEFAULT_TAG_LIMIT } from "@/constants"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const page = Number(newUrl.searchParams.get("page")) || 0
  const limit = newUrl.searchParams.get("limit") || DEFAULT_TAG_LIMIT

  const query = {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      _count: {
        select: {
          tagOnPost: true,
        },
      },
    },
    take: Number(limit),
    skip: (page === 0 ? 0 : page - 1) * Number(limit),
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  } as Prisma.TagsFindManyArgs

  try {
    const [data, count] = await Promise.all([
      prisma.tags.findMany(query),
      prisma.tags.count({
        where: query.where,
      }),
    ])

    return Response.json({
      totalItems: Math.ceil(count / Number(limit)),
      data: data,
    })
  } catch (error) {
    throw error
  }
}
