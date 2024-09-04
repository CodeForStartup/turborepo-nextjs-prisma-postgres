"use client"

import { useCallback, useState } from "react"
import { useSearchParams } from "next/navigation"

import { getPosts, PostStatus, TPostItem } from "database"

import useInfiniteScroll from "@/hooks/useInfinityScroll"

import PostItem from "../posts/post-item"

interface PostListProps {
  containerClassName?: string
}

export default function PostList({ containerClassName }: PostListProps) {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<TPostItem[]>([])

  const loadMoreBooks = useCallback(async () => {
    setLoading(true)
    const newPosts = await getPosts({
      ...searchParams,
      postStatus: PostStatus.PUBLISHED,
      page: page.toString(),
    })
    setPosts((prevPosts) => [...prevPosts, ...newPosts?.data?.data])
    setHasMore(page < newPosts?.data?.pagination?.totalPages)
    setLoading(false)
  }, [page, searchParams])

  const { setNode } = useInfiniteScroll(loadMoreBooks, null, loading)

  return (
    <div className={containerClassName}>
      {posts?.map((post) => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))}

      <div
        ref={setNode}
        className="h-10 w-full"
      >
        {loading && <div>Loading...</div>}
      </div>
    </div>
  )
}
