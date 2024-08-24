import { PostOnUserType, Prisma } from "database"

export type TCreatePostInput = Prisma.PostCreateInput & {
  tags: {
    value: string
    label: string
    __isNew__: boolean
  }[]
}

export type TPostActionType = PostOnUserType | "UNLIKE" | "UNBOOKMARK"
