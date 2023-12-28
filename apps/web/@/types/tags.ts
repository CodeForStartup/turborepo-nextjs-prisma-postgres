import { Prisma } from "database"

export const tagSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  type: true,
  image: true,
  name: true,
  slug: true,
  description: true,
  parent: true,
  count: true,
  tagOnPost: true,
  _count: true,
} satisfies Prisma.TagsSelect

const getTagItem = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: tagSelect,
})

export type TTagItem = Prisma.PostGetPayload<typeof getTagItem>
