"use client"

import React, { useCallback, useState } from "react"
import { useParams } from "next/navigation"

import { getTags, TTagItem } from "database"

import InfiniteScroll from "@/molecules/infinite-scroll"

import TagItem from "../tag-item"

const TagList: React.FC = () => {
  const searchParams = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<TTagItem[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  const loadTags = useCallback(async () => {
    if (!hasNextPage) return

    setIsLoading(true)
    const { data } = await getTags({
      ...searchParams,
      page,
    })

    setTags((prev) => [...prev, ...data?.data])
    setHasNextPage(data?.totalPages > page)
    setIsLoading(false)
    setPage((prev) => prev + 1)
  }, [searchParams, page])

  return (
    <InfiniteScroll
      loading={isLoading}
      nextPage={loadTags}
    >
      <div className="mt-4">
        {tags?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {tags.map((tag) => (
              <TagItem
                key={tag.id}
                tag={tag}
              />
            ))}
          </div>
        ) : null}
      </div>
    </InfiniteScroll>
  )
}

export default TagList
