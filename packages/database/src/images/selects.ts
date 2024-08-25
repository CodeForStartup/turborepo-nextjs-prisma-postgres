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

const getImage = Prisma.validator<Prisma.ImageDefaultArgs>()({
  select: imageSelect,
})

export type TImageItem = Prisma.ImageGetPayload<{
  select: typeof imageSelect
}>

type Color =
  | string
  | {
      r: number
      g: number
      b: number
      a: number
    }

let a: Color = "red"
let a1: Color = { r: 1, g: 2, b: 3, a: 4 }
let b = { r: 1 } as Color
let c = { r: 1, g: 2, b: 3, a: 4 } satisfies Color
let c1 = "blue" satisfies Color

a1.r
c.r
