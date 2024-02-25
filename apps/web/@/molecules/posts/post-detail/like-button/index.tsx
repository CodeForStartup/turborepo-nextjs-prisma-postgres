"use client"

import { useTranslations } from "next-intl"

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
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              onClick={likePost}
              className={cn(
                "hover:border-stale-300 border-stale-800 flex h-12 w-12 items-center justify-center rounded-full border bg-white p-0 text-2xl hover:bg-slate-200"
              )}
            >
              <i
                className={cn({
                  "ri-heart-3-fill text-red-500": isLiked,
                  "ri-heart-3-line": !isLiked,
                })}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t(isLiked ? "unlike" : "like")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        variant="link"
        className="h-8 text-lg font-bold"
      >
        {totalLike}
      </Button>
    </div>
  )
}

export default LikeButton
