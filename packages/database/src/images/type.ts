import { Image, Prisma } from "@prisma/client"
import { IActionReturn, IGetListResponse } from "src/shared/type"

export type ImageOrderBys = "createdAt" | "name"

export interface IImageFilter {
  page?: number
  limit?: number
  userId?: string
  where?: Prisma.ImageWhereInput
  order?: Prisma.ImageOrderByRelevanceInput
}

export interface IListImageResponse extends IActionReturn<IGetListResponse<Image>> {}
