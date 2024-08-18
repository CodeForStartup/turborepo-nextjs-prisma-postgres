import { TImageFilter } from "database"
import useSWR from "swr"

const getImages = async (filter: TImageFilter) => {
  const queryParams = new URLSearchParams()

  // TODO: will update filter params later
  // Add filter parameters to the query string
  // if (filter.) queryParams.append('search', filter.search)
  if (filter.order) queryParams.append("order", filter.order)
  if (filter.orderBy) queryParams.append("orderBy", filter.orderBy)
  // Add any other filter parameters as needed

  const url = `/api/protected/images?${queryParams.toString()}`

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

export function useGetImages(filter: TImageFilter) {
  const { data, error, isLoading, mutate } = useSWR(["/api/protected/images", filter], () =>
    getImages(filter)
  )

  return {
    images: data?.data?.data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
