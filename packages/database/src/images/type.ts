import { OrderBy } from "src/shared/type"

export type TImageFilter = {
  page: number
  limit: number
  userId?: string
  orderBy?: string
  order?: OrderBy
}
