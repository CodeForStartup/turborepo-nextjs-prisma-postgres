import { Prisma } from "database"

export const tagListSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  _count: {
    select: {
      tagOnPost: true,
    },
  },
} satisfies Prisma.TagsSelect

export const tagItemSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  _count: {
    select: {
      tagOnPost: true,
    },
  },
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
})

export type TTagItem = Prisma.TagsGetPayload<typeof getTagItem>

export type TTagListItem = Prisma.TagsGetPayload<typeof getTagList>
