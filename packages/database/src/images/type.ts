import { Image } from "@prisma/client"
import { ActionReturnType, OrderBy, TGetListResponse } from "src/shared/type"

export type TImageFilter = {
  page?: number
  limit?: number
  userId?: string
  orderBy?: string
  order?: OrderBy
  search?: string
}

export type TListImageResponse = ActionReturnType<TGetListResponse<Image>>
