import { Prisma } from "database"

export const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  commentOnPostId: true,
  author: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  },
} satisfies Prisma.CommentSelect

const getCommentItem = Prisma.validator<Prisma.CommentDefaultArgs>()({
  select: commentSelect,
})

export type TCommentItem = Prisma.PostGetPayload<typeof getCommentItem>
