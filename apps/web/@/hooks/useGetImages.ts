import { useMemo } from "react"

import { IImageFilter, IListImageResponse } from "database"
import useSWRInfinite from "swr/infinite"

const getImages = async (url): Promise<IListImageResponse> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch images")
  }

  return response.json()
}

export function useGetImages(filter: IImageFilter) {
  const { data, mutate, size, setSize, isLoading, error } = useSWRInfinite(
    (index) => {
      const queryParams = new URLSearchParams()

      if (filter.search) queryParams.append("search", filter.search)
      if (filter.order) queryParams.append("order", filter.order)
      queryParams.append("page", (index + 1).toString())

      return `/api/protected/images?${queryParams.toString()}`
    },
    (url) => getImages(url)
  )

  const images = useMemo(() => (data || []).flatMap((page) => page?.data?.data?.data), [data])
  const totalPages = useMemo(() => data?.[0]?.data?.data?.totalPages, [data])
  const total = useMemo(() => data?.[0]?.data?.data?.total, [data])

  const fetchMore = () => {
    if (size >= totalPages) {
      return
    }

    setSize(size + 1)
  }

  return {
    images,
    total,
    isLoading,
    isError: error,
    mutate,
    fetchMore,
  }
}
