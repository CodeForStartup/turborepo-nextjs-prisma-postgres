import { Prisma } from "database"

import { tagListSelect } from "@/types/tags"

export const getTags = async ({
  page = 1,
  limit = 10,
  query = "",
}: {
  query: string
  page: number
  limit: number
}) => {
  const tagQuery: Prisma.TagsFindManyArgs = {
    select: tagListSelect,
    take: Number(limit) || 10,
    skip: (page === 0 ? 0 : page - 1) * Number(limit),
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
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
