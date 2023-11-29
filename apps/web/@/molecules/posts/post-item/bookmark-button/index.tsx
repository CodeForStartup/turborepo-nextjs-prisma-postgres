"use client"

import React from "react"
import { LucideBookmarkMinus, LucideBookmarkPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useBookMark from "@/hooks/useBookMark"
import { cn } from "@/lib/utils"
import { TPostItem } from "@/types/posts"

type BookmarkButtonProps = {
  post: TPostItem
  showCount?: boolean
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ post, showCount }) => {
  const { isLoading, isBookMarked, totalBookMark, bookMark } = useBookMark({ post })

  const BookMarkIcon = isBookMarked ? LucideBookmarkMinus : LucideBookmarkPlus

  return (
    <div className="flex flex-col items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              variant="link"
              className={cn({
                "h-8 w-8 rounded p-0 text-gray-600 hover:bg-slate-300": !showCount,
                "hover:border-stale-300 border-stale-800 flex h-12 w-12 items-center justify-center rounded-full border bg-white p-0 text-lg hover:bg-slate-200":
                  showCount,
              })}
              onClick={bookMark}
            >
              <BookMarkIcon className={cn({})} />
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
