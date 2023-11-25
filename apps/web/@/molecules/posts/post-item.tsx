"use client"

import { useState } from "react"
import dayjs from "dayjs"
import {
  LucideBookmarkMinus,
  LucideBookmarkPlus,
  LucideHeart,
  LucideMessageSquare,
} from "lucide-react"
import Link from "next/link"
import { toast } from "react-toastify"

import { TPostItem } from "@/actions/protected/posts"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import APP_APIS from "@/constants/apis"
import { generatePath } from "@/utils/generatePath"
import TagBadge from "../tag/tag-badge"

export default function PostItem({ post }: { post: TPostItem }) {
  const [isLoading, setIsLoading] = useState(false)

  const [isBookmarked, setIsBookmarked] = useState(() => {
    return post?.postOnUser?.some(
      (user) => user?.userId === post?.author?.id && user?.type === "BOOKMARK"
    )
  })

  const onBookmark = async () => {
    try {
      setIsLoading(true)
      await fetch(generatePath(APP_APIS.protected.post.actions, { postId: post?.id }), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isBookmarked ? "UNBOOKMARK" : "BOOKMARK",
        }),
      })
      setIsBookmarked((prev) => !prev)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4 flex rounded-sm bg-white px-8 py-4">
      <div className="flex-1">
        <Link href={`/posts/${post.id}`}>
          <h2 className="flex flex-1 text-2xl font-bold text-slate-700 hover:underline">
            {post.title}
          </h2>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <div className="text hover:underline">
            <Link href={`/author/${post?.author?.id}`}>@{post?.author?.name}</Link>
          </div>
          <div className="h-1 w-1 rounded bg-gray-400" />
          <div>Last edited: {dayjs(post.createdAt).format("MMMM D, YYYY")}</div>
        </div>
        <div className="mt-2">
          {post?.tagOnPost?.length > 0 &&
            post?.tagOnPost?.map(({ tag }) => <TagBadge key={tag?.id} tag={tag} />)}
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-8">
            <div className="flex items-center gap-1">
              <LucideHeart className="h-4 w-4 text-red-500" />
              <div className="text-sm text-gray-600">
                {post?.postOnUser?.filter((user) => user?.type === "LIKE").length}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <LucideMessageSquare className="h-4 w-4 text-gray-600" />
              <div className="text-sm text-gray-600 hover:underline">
                <Link href={`/posts/${post.id}`}>{[post?.Comment || []].length}</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      disabled={isLoading}
                      variant="link"
                      className="h-[40px] w-[40px] rounded p-0 text-gray-600 hover:bg-slate-300"
                      onClick={onBookmark}
                    >
                      {isBookmarked ? (
                        <LucideBookmarkMinus className="h-4 w-4 text-green-900" />
                      ) : (
                        <LucideBookmarkPlus className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isBookmarked ? "Unbookmark" : "Bookmark"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
