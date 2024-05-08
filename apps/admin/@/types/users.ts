import { Prisma } from "database"

export const userSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  username: true,
  bio: true,
  website: true,
  address: true,
  accounts: true,
  phone: true,
  twitter: true,
  facebook: true,
  github: true,
  _count: {
    select: {
      post: true,
      followers: true,
      followings: true,
    },
  },
} satisfies Prisma.UserSelect

const getUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: userSelect,
})

export type TUserItem = Prisma.UserGetPayload<typeof getUser>

export type TUpdateUserInput = Prisma.UserCreateInput
