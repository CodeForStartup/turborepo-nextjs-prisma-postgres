"use server"

import prisma, { Prisma } from "database"

const tagListSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
} satisfies Prisma.TagsSelect

const tagItemSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  tagOnPost: {
    select: {
      post: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          postOnUser: {
            select: {
              userId: true,
              type: true,
            },
          },
          tagOnPost: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.TagsSelect

const getTagItem = Prisma.validator<Prisma.TagsDefaultArgs>()({
  select: tagItemSelect,
})

const getTagList = Prisma.validator<Prisma.TagsDefaultArgs>()({
  select: tagListSelect,
  include: {
    _count: {
      select: {
        tagOnPost: true,
      },
    },
  },
})

export type TTagItem = Prisma.TagsGetPayload<typeof getTagItem>

export type TTagListItem = Prisma.TagsGetPayload<typeof getTagList>

export const getTags = async (): Promise<TTagListItem[]> => {
  try {
    const tags = await prisma.tags.findMany({
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
    })

    return tags
  } catch (error) {
    throw error
  }
}

export const getTagById = async (id: string): Promise<TTagItem> => {
  try {
    const tag = await prisma.tags.findUnique({
      where: {
        id,
      },
      select: tagItemSelect,
    })

    return tag
  } catch (error) {
    throw error
  }
}
