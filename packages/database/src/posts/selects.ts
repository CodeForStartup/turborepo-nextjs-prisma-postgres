import { PostOnUserType, Prisma } from "@prisma/client"

export const postSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  slug: true,
  postStatus: true,
  totalLike: true,
  totalFollow: true,
  image: {
    select: {
      id: true,
      url: true,
      previewUrl: true,
    },
  },
  author: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  },
  _count: {
    select: {
      comments: true,
      postOnUser: true,
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

export type TPostItem = Prisma.PostGetPayload<{
  select: typeof postSelect
}>

export type TCreatePostInput = Prisma.PostCreateInput

export type TPostActionType = PostOnUserType | "UNLIKE" | "UNBOOKMARK"
