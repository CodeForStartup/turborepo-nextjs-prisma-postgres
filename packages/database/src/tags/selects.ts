import { Prisma } from "@prisma/client"

export const tagListSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  image: {
    select: {
      id: true,
      url: true,
    },
  },
  type: true,
  totalFollowers: true,
  updatedAt: true,
  createdAt: true,
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
  type: true,
  totalFollowers: true,
  updatedAt: true,
  createdAt: true,
  _count: {
    select: {
      tagOnPost: true,
    },
  },
} satisfies Prisma.TagsSelect

export type TTagItem = Prisma.TagsGetPayload<{
  select: typeof tagItemSelect
}>

export type TTagListItem = Prisma.TagsGetPayload<{
  select: typeof tagListSelect
}>
