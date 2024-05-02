import { Prisma } from "@prisma/client"

export const tagListSelect = Prisma.validator<Prisma.TagsSelect>()({
  id: true,
  name: true,
  slug: true,
  description: true,
  image: true,
  type: true,
  totalFollowers: true,
  updatedAt: true,
  createdAt: true,
  _count: {
    select: {
      tagOnPost: true,
    },
  },
})

export const tagItemSelect = Prisma.validator<Prisma.TagsSelect>()({
  id: true,
  name: true,
  slug: true,
  description: true,
  type: true,
  totalFollowers: true,
  updatedAt: true,
  createdAt: true,
  _count: {
    select: {
      tagOnPost: true,
    },
  },
})

const getTagItem = Prisma.validator<Prisma.TagsDefaultArgs>()({
  select: tagItemSelect,
})

const getTagList = Prisma.validator<Prisma.TagsDefaultArgs>()({
  select: tagListSelect,
})

export type TTagItem = Prisma.TagsGetPayload<typeof getTagItem>

export type TTagListItem = Prisma.TagsGetPayload<typeof getTagList>
