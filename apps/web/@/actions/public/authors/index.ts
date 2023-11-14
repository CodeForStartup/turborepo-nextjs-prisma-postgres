import { Prisma } from "database"

const userItemSelect = {
  id: true,
  name: true,
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
      pagOnPost: {
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
} satisfies Prisma.UserSelect

const getUserItem = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: userItemSelect,
})

export type TUserItem = Prisma.UserGetPayload<typeof getUserItem>

export const getUserById = async (id: string): Promise<TUserItem> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: userItemSelect,
    })

    return user
  } catch (error) {
    throw error
  }
}
