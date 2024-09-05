"use server"

import { Prisma, Tags } from "@prisma/client"
import slugify from "slugify"

import { LIMIT_PER_PAGE } from "../constant"
import prisma from "../prisma"
import { DEFAULT_LIMIT, DEFAULT_PAGE, IActionReturn, IGetListResponse } from "../shared/type"
import { tagItemSelect, tagListSelect, TTagItem, TTagListItem } from "./selects"

type GetTagsProps = {
  page?: number
  limit?: number
  query?: string
  sorting?: any[]
}

export const getTags = async ({
  page = 1,
  limit = LIMIT_PER_PAGE,
  query = "",
  sorting,
}: GetTagsProps): Promise<IActionReturn<IGetListResponse<TTagItem>>> => {
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
    tagQuery.orderBy = sorting?.map((sort) => ({
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
      data: {
        data,
        total,
        limit,
        page,
        totalPages: Math.ceil(total / Number(limit)),
      },
    }
  } catch (error) {
    throw {
      data: {
        data: [],
        total: 0,
        limit,
        page,
      },
      error,
    }
  }
}

type GetTagProps = {
  tagIdOrSlug: string
}

export const getTag = async ({
  tagIdOrSlug,
}: GetTagProps): Promise<IActionReturn<TTagItem | null>> => {
  try {
    const data = await prisma.tags.findFirst({
      where: {
        OR: [
          {
            id: tagIdOrSlug,
          },
          {
            slug: tagIdOrSlug,
          },
        ],
      },
      select: tagItemSelect,
    })

    return {
      data,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const createTag = async (tag: Prisma.TagsCreateInput): Promise<TTagItem> => {
  return prisma.tags.create({
    data: {
      ...tag,
      slug: tag.slug || slugify(tag.name.toLocaleLowerCase()) + "-" + Date.now(),
    },
    select: tagItemSelect,
  })
}

export const updateTag = async ({
  tagId,
  tag,
}: {
  tagId: string
  tag: Prisma.TagsUpdateArgs["data"]
}): Promise<TTagItem> => {
  return prisma.tags.update({
    where: {
      id: tagId,
    },
    data: tag,
    select: tagItemSelect,
  })
}

export const deleteTag = async (tagId: string): Promise<TTagItem> => {
  return prisma.tags.delete({
    where: {
      id: tagId,
    },
    select: tagItemSelect,
  })
}

// Get top 10 tags
export const getTopTags = async (props?: {
  page?: number
  limit?: number
}): Promise<IActionReturn<IGetListResponse<TTagItem>>> => {
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = props || {}
  const query = {
    select: tagListSelect,
    take: Number(limit),
    skip: (page === 0 ? 0 : page - 1) * Number(limit),
    orderBy: {
      tagOnPost: {
        _count: "desc",
      },
    },
  } satisfies Prisma.TagsFindManyArgs

  try {
    const data = await prisma.tags.findMany(query)

    return {
      data: {
        data,
        total: data.length,
        limit,
        page,
        totalPages: Math.ceil(data.length / limit),
      },
    }
  } catch (error) {
    throw {
      data: [],
      error,
    }
  }
}
