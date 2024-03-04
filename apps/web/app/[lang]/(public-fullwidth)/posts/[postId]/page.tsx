import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPost } from "@/actions/public/posts"
import PostDetail from "@/molecules/posts/post-detail"
import Comments from "@/molecules/posts/post-detail/comments"
import LikeButton from "@/molecules/posts/post-detail/like-button"
import TableOfContents from "@/molecules/posts/post-detail/table-of-contents"
import BookmarkButton from "@/molecules/posts/post-item/bookmark-button"
import { TSearchParams } from "@/types"

import "./tocbot.css"

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost({ postIdOrSlug: params?.postId })

  return {
    title: post?.title,
    description: post?.content.slice(0, 160),
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { postId: string }
  searchParams: TSearchParams
}) {
  const post = await getPost({ postIdOrSlug: params?.postId })

  if (!post) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9 flex gap-4">
        <div className="mt-8 flex w-12 flex-col gap-6">
          <LikeButton post={post} />
          <BookmarkButton
            post={post}
            showCount
          />
        </div>

        <div className="flex-1">
          <PostDetail post={post} />
          <Comments
            post={post}
            searchParams={searchParams}
          />
        </div>
      </div>

      <div className="col-span-3">
        <TableOfContents />
      </div>
    </div>
  )
}
