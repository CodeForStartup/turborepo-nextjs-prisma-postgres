"use client"

import { useState } from "react"
import { LucideHeart } from "lucide-react"
import { getSession } from "next-auth/react"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import APP_APIS from "@/constants/apis"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

type LikeButtonProps = {
  post: TPostItem
  postDetailMode?: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ post, postDetailMode }: LikeButtonProps) => {
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
    const session = await getSession()

    if (!session) {
      toast.error("You must be logged in to like a post")
      return
    }

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
            {postDetailMode ? (
              <div className="flex w-12 flex-col items-center justify-center">
                <Button
                  disabled={isLoading}
                  onClick={onLike}
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
            )}
          </TooltipTrigger>
          <TooltipContent>{isLiked ? "Unlike" : "Like"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default LikeButton
