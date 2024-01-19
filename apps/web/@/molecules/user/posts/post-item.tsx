"use client"

import dayjs from "dayjs"
import Link from "next/link"

import { deletePost } from "@/actions/protected/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { TPostItem } from "@/types/posts"

export default function PostItem(post: TPostItem) {
  const onDeletePost = async () => {
    await deletePost(post.id)
  }

  return (
    <div className="mb-4 flex items-center justify-center rounded-sm border px-8 py-4">
      <div className="flex-1">
        <Link href={`posts/${post.id}/edit`}>
          <h2 className="text-2xl font-bold">{post.title} </h2>
          <div className="mt-1 text-xs">
            <Badge className="mr-2 rounded-sm text-gray-600">
              {post?.postStatus === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
            </Badge>
            Last edited: <time>{dayjs(post.createdAt).format("MMMM D, YYYY")}</time>
          </div>
        </Link>
      </div>

      <div className="">
        <Button variant="link">Edit</Button>
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
