"use client"

import { useTranslations } from "next-intl"

import { likePost, unLikePost } from "@/actions/protected/postAction"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TPostItem } from "@/types/posts"

type LikeButtonProps = {
  post: TPostItem
  totalLike: number
  isLiked: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ post, isLiked, totalLike }: LikeButtonProps) => {
  const t = useTranslations()

  const toggleLike = () => {
    ;(isLiked ? unLikePost : likePost)({
      post,
    })
  }

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleLike}
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
          <TooltipContent>{t(isLiked ? "common.unlike" : "common.like")}</TooltipContent>
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
