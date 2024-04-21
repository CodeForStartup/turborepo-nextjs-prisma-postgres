import { ColumnSort } from "@tanstack/react-table"
import { Prisma } from "database"

import { tagListSelect } from "@/types/tags"

export const getTags = async ({
  page = 1,
  limit = 10,
  query = "",
  sorting,
}: {
  query?: string
  page?: number
  limit?: number
  sorting?: string
}) => {
  const tagQuery: Prisma.TagsFindManyArgs = {
    select: tagListSelect,
    take: Number(limit) || 10,
    skip: (page > 0 ? page - 1 : 0) * Number(limit),
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  }

  if (sorting) {
    const sortArr = JSON.parse(sorting) as ColumnSort[]
    tagQuery.orderBy = sortArr?.map((sort) => ({
      [sort.id]: sort.desc ? "desc" : "asc",
    }))
  }

  try {
    const [data, total] = await Promise.all([
      prisma.tags.findMany(tagQuery),
      prisma.tags.count({
        where: tagQuery.where,
      }),
    ])

    return {
      data,
      total,
      limit,
      page,
    }
  } catch (error) {
    throw {
      data: [],
      total: 0,
      limit,
      page,
      errorMessage: error.message,
    }
  }
}
