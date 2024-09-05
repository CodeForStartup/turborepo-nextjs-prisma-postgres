import { NextRequest } from "next/server"

import prisma, { Prisma, tagListSelect } from "database"

import { DEFAULT_TAG_PAGE_LIMIT } from "@/constants"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const page = Number(newUrl.searchParams.get("page")) || 0
  const limit = newUrl.searchParams.get("limit") || DEFAULT_TAG_PAGE_LIMIT

  const query = {
    select: tagListSelect,
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
    const [data, total] = await Promise.all([
      prisma.tags.findMany(query),
      prisma.tags.count({
        where: query.where,
      }),
    ])

    return Response.json({
      total,
      data,
      limit,
      page,
    })
  } catch (error) {
    throw error
  }
}
