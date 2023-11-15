"use client"

import dayjs from "dayjs"
import { LucideBookmark, LucideHeart, LucideMessageSquare } from "lucide-react"
import Link from "next/link"

import { TPostItem } from "@/actions/protected/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PostItem({ post }: { post: TPostItem }) {
  return (
    <div className="mb-4 flex rounded-sm bg-white px-8 py-4">
      <div className="flex-1">
        <Link href={`/posts/${post.id}`}>
          <h2 className="text-2xl font-bold text-slate-700">{post.title}</h2>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <div className="text hover:underline">
            <Link href={`author/${post?.author?.id}`}>@{post?.author?.name}</Link>
          </div>
          <div className="h-1 w-1 rounded bg-gray-400" />
          <div>Last edited: {dayjs(post.createdAt).format("MMMM D, YYYY")}</div>
        </div>
        <div className="mt-2">
          {post?.pagOnPost?.length > 0 &&
            post?.pagOnPost?.map((tag) => (
              <Link href={`/tags/${tag?.tag?.id}`} key={tag?.tag?.id}>
                <Badge className="mr-2 rounded-sm bg-slate-200 text-gray-600 hover:bg-slate-300">
                  {tag?.tag?.name}
                </Badge>
              </Link>
            ))}
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-8">
            <div className="flex items-center gap-1">
              <LucideHeart className="h-4 w-4 text-red-500" />
              <div className="text-sm text-gray-600">{post?.postOnUser?.length}</div>
            </div>
            <div className="flex items-center gap-1">
              <LucideMessageSquare className="h-4 w-4 text-gray-600" />
              <div className="text-sm text-gray-600">
                <Link href={`posts/${post.id}`}>100</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Button
                variant="link"
                className="h-[40px] w-[40px] rounded p-0 text-gray-600 hover:bg-slate-300"
              >
                <LucideBookmark className="h-4 w-4 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
