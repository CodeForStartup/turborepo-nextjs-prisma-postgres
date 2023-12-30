export type GetDataSuccessType<T> = {
  data: T
  page: number
  limit: number
  total: number
}

export type GetDataErrorType = {
  message: string
  code: number
}
