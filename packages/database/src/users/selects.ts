import { Prisma } from "@prisma/client"

export const userDetailSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  bio: true,
  address: true,
  website: true,
  totalFollower: true,
  totalFollowing: true,
  totalPost: true,
  totalView: true,
} satisfies Prisma.UserSelect

export type TUserDetail = Prisma.UserGetPayload<{
  select: typeof userDetailSelect
}>
