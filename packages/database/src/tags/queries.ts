"use server"

import { Prisma, Tags } from "@prisma/client"
import slugify from "slugify"

import { LIMIT_PER_PAGE } from "../constant"
import prisma from "../prisma"
import { DEFAULT_LIMIT, DEFAULT_PAGE, IActionReturn, IGetListResponse } from "../shared/type"
import { tagItemSelect, tagListSelect, TTagItem, TTagListItem } from "./selects"

export const getTags = async (
  tagsFindManyArgs: Prisma.TagsFindManyArgs = {
    take: LIMIT_PER_PAGE,
    skip: DEFAULT_LIMIT * (DEFAULT_PAGE - 1),
  }
): Promise<IActionReturn<IGetListResponse<TTagListItem>>> => {
  try {
    const [data, total] = await Promise.all([
      prisma.tags.findMany({
        ...tagsFindManyArgs,
        select: tagListSelect,
      }),
      prisma.tags.count({
        where: tagsFindManyArgs?.where || {},
      }),
    ])

    prisma.tags.findMany()

    return {
      data: {
        data,
        total,
        limit: tagsFindManyArgs?.take || DEFAULT_LIMIT,
      },
    }
  } catch (error) {
    console.log("error", error)

    throw {
      data: {
        data: [],
        total: 0,
        limit: DEFAULT_LIMIT,
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
