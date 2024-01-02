import React from "react"

import CommentItem from "./comment-detail"
import CommentInput from "./comment-input"

interface CommentsProps {}

/**
 * This component displays the comments for a post.
 */
const Comments: React.FC<CommentsProps> = () => {
  // TODO: Implement the logic to fetch and display comments

  return (
    <div className="mt-8 rounded-md bg-gray-50">
      <div className="border-b border-b-slate-300 px-8 py-4">
        <h2 className="font-bold">Comments</h2>
      </div>
      <div className="p-8">
        <CommentInput />
      </div>

      <CommentItem
        comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        author="Luan Nguyen"
      />
    </div>
  )
}

export default Comments
