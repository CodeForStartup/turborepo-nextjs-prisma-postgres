"use client"

import Link from "next/link"

import dayjs from "dayjs"

import { deletePost } from "@/actions/protected/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Typography from "@/molecules/typography"
import { TPostItem } from "@/types/posts"

export default function PostItem(post: TPostItem) {
  const onDeletePost = async () => {
    await deletePost(post.id)
  }

  return (
    <div className="mb-4 flex items-center justify-center rounded-sm border px-8 py-4 hover:bg-muted">
      <div className="flex-1">
        <Link href={`posts/${post.id}/edit`}>
          <Typography variant="h2">{post.title}</Typography>
          <div className="mt-1 text-xs">
            <Badge className="mr-2 rounded-sm text-gray-600">
              {post?.postStatus === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
            </Badge>
            <Typography variant="span">
              Last edited: <time>{dayjs(post.createdAt).format("MMMM D, YYYY")}</time>
            </Typography>
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
            <Link href={`/posts/${post.id}`}>Preview</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/user/posts/${post.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeletePost}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
