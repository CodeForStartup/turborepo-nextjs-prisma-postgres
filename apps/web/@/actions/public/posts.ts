"use server"

import prisma, { PostStatus, Prisma } from "database"
import dayjs from "dayjs"

import { FilterValues, PeriodValues } from "@/types/filter"
import { postSelect, TPostItem } from "@/types/posts"

export const getPost = async ({ postIdOrSlug }): Promise<TPostItem> => {
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
