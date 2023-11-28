import React from "react"

interface CommentsProps {}

/**
 * This component displays the comments for a post.
 */
const Comments: React.FC<CommentsProps> = () => {
  // TODO: Implement the logic to fetch and display comments

  return (
    <div className="mt-8 rounded-md bg-white">
      <div className="border-b border-b-slate-300 px-8 py-4">
        <h2 className="font-bold">Comments</h2>
      </div>
      <div className="p-8">
        <p className="text-slate-500">No comments yet.</p>
      </div>
    </div>
  )
}

export default Comments
