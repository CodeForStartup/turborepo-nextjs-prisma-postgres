import { Image } from "@prisma/client"
import { IActionReturn, IGetListResponse, OrderBy } from "src/shared/type"

export type ImageOrderBys = "createdAt" | "name"

export interface IImageFilter {
  page?: number
  limit?: number
  userId?: string
  orderBy?: ImageOrderBys
  order?: OrderBy
  search?: string
}

export interface IListImageResponse extends IActionReturn<IGetListResponse<Image>> {}
