"use client"

import { PostOnUserType, TPostItem } from "database"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button, cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "ui"

import { addRelation, removeRelation } from "@/actions/protect/postAction"

type LikeButtonProps = {
  post: TPostItem
  totalLike: number
  isLiked: boolean
  children: React.ReactNode
}

const LikeButton: React.FC<LikeButtonProps> = ({ children, post, isLiked }: LikeButtonProps) => {
  const t = useTranslations()

  const toggleLike = () => {
    ;(isLiked ? removeRelation : addRelation)({
      postId: post.id,
      postSlug: post.slug,
      action: PostOnUserType.LIKE,
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
              <Heart
                fill={isLiked ? "tomato" : "gray"}
                color={isLiked ? "tomato" : "gray"}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t(isLiked ? "common.unlike" : "common.like")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {children}
    </div>
  )
}

export default LikeButton
