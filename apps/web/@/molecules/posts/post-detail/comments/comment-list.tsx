"use client"

import React, { useState } from "react"

import { TCommentItem } from "@/types/comment"

import CommentItem from "./comment-detail"
import CommentInput from "./comment-input"

type CommentListProps = {
  comments: TCommentItem[]
  postId: string
}

const CommentList: React.FC<CommentListProps> = ({ comments = [], postId }) => {
  const [curComments, setCurComments] = useState(comments)

  const onAddComment = (comment: TCommentItem) => {
    setCurComments([comment, ...curComments])
  }

  return (
    <div>
      <div className="p-8">
        <CommentInput
          postId={postId}
          onAddComment={onAddComment}
        />
      </div>

      {curComments?.length > 0 ? (
        curComments?.map((comment) => (
          <CommentItem
            key={comment?.id}
            comment={comment}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default CommentList
