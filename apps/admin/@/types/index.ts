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

export type TSearchParams = {
  [key: string]: string | string[][] | Record<string, string> | URLSearchParams
}
