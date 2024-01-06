"use client"

import React, { useEffect, useState } from "react"

import { TCommentItem } from "@/types/comment"
import { TPostItem } from "@/types/posts"
import CommentItem from "./comment-detail"
import CommentInput from "./comment-input"

interface CommentsProps {
  post: TPostItem
}

/**
 * This component displays the comments for a post.
 */
const Comments: React.FC<CommentsProps> = ({ post }) => {
  const [comments, setComments] = useState<Array<TCommentItem>>([])

  useEffect(() => {
    const getComments = async () => {
      try {
        const commentRaw = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/public/post/${post?.id}/comments`,
          {
            cache: "no-cache",
          }
        )

        const commentParsed = await commentRaw.json()

        setComments(commentParsed?.data)
      } catch (error) {}
    }

    getComments()
  }, [])

  const onAddComment = (comment: TCommentItem) => {
    setComments([comment, ...comments])
  }

  if (comments.length === 0) {
    return <div>Comments not found</div>
  }

  return (
    <div className="mt-8 rounded-md border bg-gray-50">
      <div className="border-b border-b-slate-300 px-8 py-4">
        <h2 className="font-bold">Comments</h2>
      </div>
      <div className="p-8">
        <CommentInput postId={post?.id} onAddComment={onAddComment} />
      </div>

      {comments?.map((comment) => <CommentItem key={comment?.id} comment={comment} />)}
    </div>
  )
}

export default Comments
