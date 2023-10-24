"use client"

import { TPostItem } from "app/user/posts/post-actions"
import dayjs from "dayjs"
import Link from "next/link"

export default function PostItem(post: TPostItem) {
  return (
    <div className="flex py-4">
      <div className="flex-1">
        <Link href={`posts/${post.id}`}>
          <h2 className="text-2xl font-bold text-slate-700">{post.title}</h2>
        </Link>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          <div className="text hover:underline">
            <Link href={`author/${post?.author?.id}`}>@{post?.author?.name}</Link>
          </div>
          <div className="h-1 w-1 rounded bg-gray-400" />
          <div>Last edited: {dayjs(post.createdAt).format("MMMM D, YYYY")}</div>
        </div>
      </div>
    </div>
  )
}
