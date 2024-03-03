import { PostOnUserType, Prisma } from "database"

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

const getPostItem = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: postSelect,
})

export type TPostItem = Prisma.PostGetPayload<typeof getPostItem>

export type TCreatePostInput = Prisma.PostCreateInput & {
  tags: {
    value: string
    label: string
    __isNew__: boolean
  }[]
}

export type TPostActionType = PostOnUserType | "UNLIKE" | "UNBOOKMARK"
