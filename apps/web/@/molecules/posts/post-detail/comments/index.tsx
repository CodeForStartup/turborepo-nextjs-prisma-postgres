import React from "react"

import { GetDataSuccessType, TSearchParams } from "@/types"
import { TCommentItem } from "@/types/comment"
import { TPostItem } from "@/types/posts"

import CommentHeader from "./comment-header"
import CommentList from "./comment-list"

interface CommentsProps {
  post: TPostItem
  searchParams: TSearchParams
}

const Comments: React.FC<CommentsProps> = async ({ post, searchParams }) => {
  let comments: GetDataSuccessType<TCommentItem[]> = null
  try {
    const urlSearchParam = new URLSearchParams(searchParams as Record<string, string>)
    const commentRaw = await fetch(
      `${
        process.env.NEXT_PUBLIC_FRONTEND_URL
      }/api/public/post/${post?.id}/comments?${urlSearchParam.toString()}`,
      {
        cache: "no-cache",
      }
    )

    comments = await commentRaw.json()
  } catch (error) {
    //
  }

  return (
    <div className="mt-8 rounded-md border">
      <CommentHeader
        post={post}
        comments={comments}
      />
      <CommentList
        comments={comments?.data}
        postId={post?.id}
      />
    </div>
  )
}

export default Comments
