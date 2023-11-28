"use client"

import React from "react"
import { LucideBookmarkMinus, LucideBookmarkPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useBookMark from "@/hooks/useBookMark"
import { TPostItem } from "@/types/posts"

type BookmarkButtonProps = {
  post: TPostItem
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ post }) => {
  const { isLoading, isBookMarked, bookMark } = useBookMark({ post })

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              variant="link"
              className="h-8 w-8 rounded p-0 text-gray-600 hover:bg-slate-300"
              onClick={bookMark}
            >
              {isBookMarked ? (
                <LucideBookmarkMinus className="h-4 w-4 text-green-900" />
              ) : (
                <LucideBookmarkPlus className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isBookMarked ? "Unbookmark" : "Bookmark"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default BookmarkButton
