"use client"

import { deletePost, TPostItem } from "app/(protected)/user/posts/post-actions"
import dayjs from "dayjs"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PostItem(post: TPostItem) {
  const onDeletePost = async () => {
    await deletePost(post.id)
  }

  return (
    <div className="flex flex-1 justify-between py-4">
      <div className="flex-1">
        <Link href={`posts/${post.id}/edit`}>
          <h2 className="text-2xl font-bold text-slate-700">{post.title}</h2>
          <div className="mt-1 text-xs text-gray-400">
            Last edited: {dayjs(post.createdAt).format("MMMM D, YYYY")}
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <i className="ri-more-2-fill" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`posts/${post.id}`}>Preview</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`posts/${post.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeletePost}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
