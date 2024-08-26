import { Prisma } from "@prisma/client"

export const imageSelect = {
  id: true,
  url: true,
  name: true,
  userId: true,
  path: true,
  hash: true,
  ext: true,
  width: true,
  height: true,
  format: true,
  previewUrl: true,
  caption: true,
  mime: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ImageSelect

export type TImage = Prisma.ImageGetPayload<{
  select: typeof imageSelect
}>
