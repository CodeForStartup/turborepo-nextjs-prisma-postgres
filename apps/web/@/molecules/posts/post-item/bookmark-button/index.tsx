"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TPostItem } from "@/types/posts"

type BookmarkButtonProps = {
  post: TPostItem
  showCount?: boolean
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ post, showCount }) => {
  const isBookMarked = false
  const totalBookMark = 100

  const onToggleBookMark = () => {
    // TODO: Implement toggle bookmark
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
              onClick={onToggleBookMark}
            >
              <i
                className={cn({
                  "ri-bookmark-3-line text-blue-900": !isBookMarked,
                  "ri-bookmark-2-line": isBookMarked,
                })}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isBookMarked ? "Unbookmark" : "Bookmark"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showCount && <span className="text-lg font-bold text-gray-600">{totalBookMark}</span>}
    </div>
  )
}

export default BookmarkButton
