"use client"

import { LucideHeart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useLike from "@/hooks/useLike"
import { cn } from "@/lib/utils"
import { TPostItem } from "@/types/posts"

type LikeButtonProps = {
  post: TPostItem
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }: LikeButtonProps) => {
  const { isLiked, isLoading, totalLike, likePost } = useLike({ post })

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              onClick={likePost}
              className={cn(
                "hover:border-stale-300 border-stale-800 flex h-12 w-12 items-center justify-center rounded-full border bg-white p-0 text-lg hover:bg-slate-200",
                { "text-red-500": isLiked, "": !isLiked }
              )}
            >
              <LucideHeart className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isLiked ? "Unlike" : "Like"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button variant="link" className="text-bold h-8 text-lg">
        {totalLike}
      </Button>
    </div>
  )
}

export default LikeButton
