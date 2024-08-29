import { PostStatus } from "@prisma/client"
import { IActionReturn, IGetListResponse } from "src/shared/type"

import { TPostItem } from "./selects"

export type TGetPostsResponse = IActionReturn<IGetListResponse<TPostItem>>

export type TGetPostsRequest = {
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
