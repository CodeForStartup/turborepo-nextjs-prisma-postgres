"use client"

import { PostOnUserType } from "database"
import { useTranslations } from "next-intl"

import { addRelation, removeRelation } from "@/actions/protect/postAction"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
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
              <i
                className={cn("ri-heart-3-fill", {
                  "text-red-500": isLiked,
                  "text-gray-500 ": !isLiked,
                })}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t(isLiked ? "common.unlike" : "common.like")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="h-8 text-lg font-bold"
          >
            {totalLike}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col gap-2">Lovers...</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LikeButton
