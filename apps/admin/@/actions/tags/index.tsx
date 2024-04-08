import { Prisma } from "database"

import { tagListSelect, TTagItem } from "@/types/tags"

export const getTags = async ({
  page = 1,
  limit = 10,
  searchTerm = "",
}: {
  searchTerm: string
  page: number
  limit: number
}) => {
  const query: Prisma.TagsFindManyArgs = {
    select: tagListSelect,
    // take: Number(limit) || 10,
    skip: (page === 0 ? 0 : page - 1) * Number(limit),
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  }

  try {
    const [data, total] = await Promise.all([
      prisma.tags.findMany(query),
      prisma.tags.count({
        where: query.where,
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
