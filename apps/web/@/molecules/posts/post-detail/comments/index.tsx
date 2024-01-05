import React from "react"

import { TPostItem } from "@/types/posts"
import CommentItem from "./comment-detail"
import CommentInput from "./comment-input"

interface CommentsProps {
  post: TPostItem
}

/**
 * This component displays the comments for a post.
 */
const Comments: React.FC<CommentsProps> = async ({ post }) => {
  let comments = null
  try {
    const commentRaw = await fetch(
      `${process.env.FRONTEND_URL}/api/public/post/${post?.id}/comments`,
      {
        cache: "no-cache",
      }
    )

    comments = await commentRaw.json()
  } catch (error) {}

  if (!comments || comments?.status === 404) {
    return <div>Comments not found</div>
  }

  return (
    <div className="mt-8 rounded-md border bg-gray-50">
      <div className="border-b border-b-slate-300 px-8 py-4">
        <h2 className="font-bold">Comments</h2>
      </div>
      <div className="p-8">
        <CommentInput postId={post?.id} />
      </div>

      {comments?.data?.map((comment) => (
        <CommentItem key={comment?.id} comment={comment?.content} author={comment?.author} />
      ))}
    </div>
  )
}

export default Comments
