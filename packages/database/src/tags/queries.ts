"use server"

import { Prisma, Tags } from "@prisma/client"
import slugify from "slugify"
import { IActionReturn, IGetListResponse } from "src/shared/type"

import { LIMIT_PER_PAGE } from "../constant"
import prisma from "../prisma"
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
}: GetTagsProps): Promise<IActionReturn<IGetListResponse<Tags>>> => {
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
    const [data, total]: [Tags[], number] = await Promise.all([
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

export const getTag = async ({ tagIdOrSlug }: GetTagProps): Promise<IActionReturn<Tags>> => {
  try {
    const data: Tags = await prisma.tags.findFirst({
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

export const createTag = async (tag: Prisma.TagsCreateArgs["data"]): Promise<TTagItem> => {
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

export const getTopTags = async ({ searchTerm = "", page = 0, limit = 10 }) => {
  let query = {
    select: tagListSelect,
    take: Number(limit),
    skip: (page === 0 ? 0 : page - 1) * Number(limit),
  } as Prisma.TagsFindManyArgs

  if (searchTerm) {
    query = {
      ...query,
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    }
  }

  try {
    const [data, total] = await Promise.all([
      prisma.tags.findMany(query),
      prisma.tags.count({
        where: query.where,
      }),
    ])

    return { data, total }
  } catch (error) {
    throw {
      data: [],
      total: 0,
      error,
    }
  }
}
