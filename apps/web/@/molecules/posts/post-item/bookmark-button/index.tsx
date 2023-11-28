"use client"

import React, { useState } from "react"
import { LucideBookmarkMinus, LucideBookmarkPlus } from "lucide-react"
import { getSession } from "next-auth/react"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import APP_APIS from "@/constants/apis"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

type BookmarkButtonProps = {
  post: TPostItem
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [isBookmarked, setIsBookmarked] = useState(() => {
    return post?.postOnUser?.some(
      (user) => user?.userId === post?.author?.id && user?.type === "BOOKMARK"
    )
  })

  const onBookmark = async () => {
    const session = await getSession()

    if (!session) {
      toast.error("You must be logged in to like a post")
      return
    }

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
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              variant="link"
              className="h-8 w-8 rounded p-0 text-gray-600 hover:bg-slate-300"
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
  )
}

export default BookmarkButton
