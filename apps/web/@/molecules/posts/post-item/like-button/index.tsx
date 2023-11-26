"use client"

import { useState } from "react"
import { LucideHeart } from "lucide-react"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import APP_APIS from "@/constants/apis"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

type LikeButtonProps = {
  post: TPostItem
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }: LikeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [totalLike, setTotalLike] = useState(
    post?.postOnUser?.filter((user) => user?.type === "LIKE").length
  )

  const [isLiked, setIsLiked] = useState(() => {
    return post?.postOnUser?.some(
      (user) => user?.userId === post?.author?.id && user?.type === "BOOKMARK"
    )
  })

  const onLike = async () => {
    try {
      setIsLoading(true)
      await fetch(generatePath(APP_APIS.protected.post.actions, { postId: post?.id }), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isLiked ? "UNLIKE" : "LIKE",
        }),
      })
      setIsLiked((prev) => !prev)
      setTotalLike((prev) => (isLiked ? prev - 1 : prev + 1))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              variant="link"
              className="h-8 rounded-md p-0 px-2 text-gray-600 hover:bg-slate-300"
              onClick={onLike}
            >
              {isLiked ? (
                <LucideHeart className="h-4 w-4 text-red-500" />
              ) : (
                <LucideHeart className="h-4 w-4" />
              )}
              <span className="ml-1 hover:no-underline">{totalLike}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isLiked ? "Unlike" : "Like"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default LikeButton
