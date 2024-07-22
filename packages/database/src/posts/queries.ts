"use server"

import { PostStatus, Prisma } from "@prisma/client"
import dayjs from "dayjs"
import slugify from "slugify"

import prisma from "../prisma"
import { ActionReturnType, FilterValues, PeriodValues } from "../shared/type"
import { postSelect, TCreatePostInput, TPostItem } from "./selects"
import { TGetPostsRequest, TGetPostsResponse } from "./type"

export const getPost = async ({
  postIdOrSlug,
}: {
  postIdOrSlug: string
}): Promise<TPostItem | null> => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          {
            id: postIdOrSlug,
          },
          {
            slug: postIdOrSlug,
          },
        ],
      },
      select: postSelect,
    })

    if (!post) {
      return null
    }

    return post
  } catch (error) {
    return null
  }
}

export const getPosts = async ({ searchParams }: TGetPostsRequest): Promise<TGetPostsResponse> => {
  const searchTerm = searchParams?.search || ""
  const tag = searchParams?.tag || ""
  const filter = searchParams?.filter || FilterValues.LASTED // lasted or hot
  const period = searchParams?.period || PeriodValues.INFINITY // lasted or hot
  const limit = searchParams?.limit || 10
  const page = searchParams?.page || 1
  const authorId = searchParams?.authorId || ""

  let where: Prisma.PostWhereInput = {}

  if (searchParams?.postStatus) {
    where = {
      ...where,
      postStatus: PostStatus.PUBLISHED,
    }
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

    return {
      data: posts,
      total: total,
      page: Number(page),
      limit: Number(limit),
    }
  } catch (error) {
    return {
      data: [],
      total: 0,
      page: Number(page),
      limit: Number(limit),
    }
  }
}

export const createPost = async (
  data: TCreatePostInput,
  userId: string
): Promise<ActionReturnType<TPostItem>> => {
  console.log("data", data)

  let newPost: TPostItem
  try {
    const slug = slugify(data.title.toLocaleLowerCase()) + "-" + Date.now()

    newPost = await prisma.post.create({
      data: {
        slug: slug,
        title: data.title,
        content: data.content,
        authorId: userId,
        postStatus: PostStatus.PUBLISHED,
        tagOnPost: {
          create: data.tags?.map((tag) => {
            if (!tag.__isNew__) {
              return {
                tag: {
                  connect: {
                    id: tag.value,
                  },
                },
              }
            }
            return {
              tag: {
                create: {
                  name: tag.label,
                  slug: tag.label.toLowerCase().replace(/\s/g, "-"),
                },
              },
            }
          }),
        },
      },
      select: postSelect,
    })

    return {
      data: newPost,
      error: null,
    }
  } catch (error) {
    throw {
      data: null,
      error: error,
    }
  }
}

export const updatePost = async (
  id: string,
  data: TCreatePostInput,
  userId: string
): Promise<ActionReturnType<TPostItem>> => {
  try {
    const { tags, ...postData } = data

    const post = await prisma.post.update({
      where: {
        id,
        authorId: userId,
      },
      data: {
        ...postData,
        tagOnPost: {
          deleteMany: {},
          create: tags?.map((tag) => {
            if (!tag.__isNew__) {
              return {
                tag: {
                  connect: {
                    id: tag.value,
                  },
                },
              }
            }
            return {
              tag: {
                create: {
                  name: tag.label,
                  slug: tag.label.toLowerCase().replace(/\s/g, "-"),
                },
              },
            }
          }),
        },
      },
      select: postSelect,
    })

    return {
      data: post,
      error: null,
    }
  } catch (error) {
    throw {
      data: null,
      error: error,
    }
  }
}

export const updatePostStatus = async (
  id: string,
  postStatus: PostStatus,
  userId: string
): Promise<ActionReturnType<TPostItem>> => {
  try {
    const post = await prisma.post.update({
      where: {
        id,
        authorId: userId,
      },
      data: {
        postStatus,
      },
      select: postSelect,
    })

    return {
      data: post,
      error: null,
    }
  } catch (error) {
    throw {
      data: null,
      error: error,
    }
  }
}
