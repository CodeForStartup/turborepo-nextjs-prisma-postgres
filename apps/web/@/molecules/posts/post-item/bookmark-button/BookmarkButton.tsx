"use client"

import React from "react"

import { PostOnUserType } from "database"

import { addRelation, removeRelation } from "@/actions/protected/postAction"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TPostItem } from "@/types/posts"

interface BookmarkButtonProps {
  totalBookmark: number
  isBookmarked: boolean
  showCount?: boolean
  post: TPostItem
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  showCount,
  totalBookmark,
  isBookmarked,
  post,
}) => {
  const handleBookmark = () => {
    ;(isBookmarked ? removeRelation : addRelation)({
      postId: post?.id,
      postSlug: post?.slug,
      action: PostOnUserType.BOOKMARK,
    })
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className={cn("no-underline hover:no-underline", {
                "h-8 w-8 rounded p-0 text-blue-900 hover:bg-slate-300": !showCount,
                "hover:border-stale-300 border-stale-800 flex h-12 w-12 items-center justify-center rounded-full border bg-white p-0 text-lg hover:bg-slate-200":
                  showCount,
              })}
              onClick={handleBookmark}
            >
              <i
                className={cn({
                  "ri-bookmark-3-line text-blue-900": !isBookmarked,
                  "ri-bookmark-2-line": isBookmarked,
                })}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isBookmarked ? "Un-Bookmark" : "Bookmark"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showCount && <span className="text-lg font-bold text-gray-600">{totalBookmark}</span>}
    </div>
  )
}

export default BookmarkButton
