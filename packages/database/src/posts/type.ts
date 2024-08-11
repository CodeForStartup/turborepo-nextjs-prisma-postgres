import { PostStatus } from "@prisma/client"
import { ActionReturnType, TGetListResponse } from "src/shared/type"

import { TPostItem } from "./selects"

export type TGetPostsResponse = ActionReturnType<TGetListResponse<TPostItem>>

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
