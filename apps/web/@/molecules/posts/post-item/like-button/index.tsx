"use client"

import { LucideHeart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useLike from "@/hooks/useLike"

type LikeButtonProps = {
  post: TPostItem
  postDetailMode?: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ post, postDetailMode }: LikeButtonProps) => {
  const { isLiked, isLiking, totalLike, likePost } = useLike({ post })

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {postDetailMode ? (
              <div className="flex w-12 flex-col items-center justify-center">
                <Button
                  disabled={isLiking}
                  onClick={likePost}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-0 text-lg hover:bg-slate-200"
                >
                  {isLiked ? (
                    <LucideHeart className="h-6 w-6 text-red-500" />
                  ) : (
                    <LucideHeart className="h-6 w-6 text-gray-600" />
                  )}
                </Button>
                <Button variant="link" className="text-bold text-lg">
                  {totalLike}
                </Button>
              </div>
            ) : (
              <Button
                disabled={isLiking}
                variant="link"
                className="h-8 rounded-md p-0 px-2 text-gray-600 hover:bg-slate-300"
                onClick={likePost}
              >
                {isLiked ? (
                  <LucideHeart className="h-4 w-4 text-red-500" />
                ) : (
                  <LucideHeart className="h-4 w-4" />
                )}
                <span className="ml-1 hover:no-underline">{totalLike}</span>
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>{isLiked ? "Unlike" : "Like"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default LikeButton
