import React from "react"
import Link from "next/link"

import { TPostItem } from "database"
import dayjs from "dayjs"

import APP_ROUTES from "@/constants/routes"
import { generatePath } from "@/utils/generatePath"

type PostMetaProps = {
  post: TPostItem
}

const PostMeta: React.FC<PostMetaProps> = ({ post }) => {
  if (!post?.author) return null

  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
      <div className="text hover:underline">
        <Link
          href={generatePath(APP_ROUTES.AUTHOR, {
            authorId: post?.author?.id,
          })}
        >
          @{post?.author?.name}
        </Link>
      </div>
      <div className="h-1 w-1 rounded bg-gray-400" />
      <time>Last edited: {dayjs(post?.createdAt).format("MMMM D, YYYY")}</time>
    </div>
  )
}

export default PostMeta
