"use client"

import { useCallback, useState } from "react"
import { useSearchParams } from "next/navigation"

import { getPosts, PostStatus, TPostItem } from "database"
import { Loader } from "lucide-react"

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

  const loadMorePosts = useCallback(async () => {
    console.log("hasMore", hasMore)
    if (!hasMore) return

    setLoading(true)
    const newPosts = await getPosts({
      ...searchParams,
      postStatus: PostStatus.PUBLISHED,
      page: page.toString(),
    })
    console.log("newPosts", newPosts)
    setPosts((prevPosts) => [...prevPosts, ...newPosts?.data?.data])
    setHasMore(page < newPosts?.data?.totalPages)
    setPage((prevPage) => prevPage + 1)
    setLoading(false)
  }, [page, searchParams])

  const { setNode } = useInfiniteScroll(loadMorePosts, null, loading)

  console.log("hasMore", hasMore)
  console.log("page", page)

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
        {loading && (
          <div className="flex min-h-10 items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
