"use client"

import { likePost } from "app/post-actions"
import { LucideHeart } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

const LikePost = ({ postId, totalLikes }: { postId: string; totalLikes: number }) => {
  const sessions = useSession()

  const handleLike = async () => {
    await likePost(postId, sessions?.data?.user?.id)
  }

  return (
    <div className="mb-6">
      <Button onClick={handleLike} className="h-10 w-10 rounded-full bg-neutral-100 p-0">
        <LucideHeart className="h-5 w-5 text-slate-500" />
      </Button>
      <div className="flex items-center justify-center text-sm font-bold text-slate-500">
        {totalLikes || 0}
      </div>
    </div>
  )
}

export default LikePost
