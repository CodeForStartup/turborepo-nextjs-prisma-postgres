"use client"

import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"

import { likePost, unlikePost } from "@/actions/public/posts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LikeButton = ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
  const sessions = useSession()

  const handleToggleLike = async () => {
    if (!sessions?.data?.user?.id) return alert("Please login to like this post")

    if (isLiked) {
      await unlikePost(postId, sessions?.data?.user?.id)
      return
    }
    await likePost(postId, sessions?.data?.user?.id)
  }

  return (
    <Button
      onClick={handleToggleLike}
      className="h-12 w-12 rounded-full bg-neutral-100 p-0 hover:bg-white"
    >
      <Heart
        className={cn("text-slate-500", {
          "text-red-500": isLiked,
        })}
      />
    </Button>
  )
}

export default LikeButton
