import { PostStatus } from "@prisma/client"

import { TPostItem } from "./selects"

export type TGetPostsResponse = {
  data: TPostItem[]
  total: number
  page: number
  limit: number
}

export type TGetPostsRequest = {
  searchParams: {
    query?: string
    search?: string
    tag?: string
    filter?: string
    period?: string
    limit?: string
    page?: string
    authorId?: string
    postStatus?: PostStatus
  }
}
