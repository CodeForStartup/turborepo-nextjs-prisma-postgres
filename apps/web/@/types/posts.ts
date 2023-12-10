import { PostOnUserType, Prisma } from "database"

export const postSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  slug: true,
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
      type: true,
      userId: true,
      postId: true,
    },
  },
  comment: {
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
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
} satisfies Prisma.PostSelect

const getPostItem = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: postSelect,
})

export type TPostItem = Prisma.PostGetPayload<typeof getPostItem>

export type TPostActionType = PostOnUserType | "UNLIKE" | "UNBOOKMARK"
