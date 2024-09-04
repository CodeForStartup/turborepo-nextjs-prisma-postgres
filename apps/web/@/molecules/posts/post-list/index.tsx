"use client"

import React, { useCallback, useState } from "react"
import { useParams } from "next/navigation"

import { getPosts, TPostItem } from "database"

import InfiniteScroll from "@/molecules/infinite-scroll"

import PostItem from "../post-item"

export default function PostList() {
  const searchParams = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<TPostItem[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  const loadPosts = useCallback(async () => {
    if (!hasNextPage) return

    setIsLoading(true)
    const { data } = await getPosts({
      ...searchParams,
      page: page.toString(),
    })

    setPosts((prev) => [...prev, ...data?.data])
    setHasNextPage(data?.totalPages > page)
    setIsLoading(false)
    setPage((prev) => prev + 1)
  }, [searchParams, page])

  return (
    <InfiniteScroll
      loading={isLoading}
      nextPage={loadPosts}
    >
      {posts?.map((post) => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))}
    </InfiniteScroll>
  )
}
