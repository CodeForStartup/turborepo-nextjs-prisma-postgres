import { getTotalLikes, isLiked } from "app/post-actions"

import { getServerSession } from "@/utitls/auth"
import LikeButton from "./like-button"

const LikePost = async ({ postId }: { postId: string; totalLikes: number }) => {
  const sessions = await getServerSession()

  const totalLikes = await getTotalLikes(postId)
  const isUserLiked = await isLiked(postId, sessions?.user?.id)

  return (
    <div className="mb-6">
      <LikeButton postId={postId} isLiked={isUserLiked} />
      <div className="flex items-center justify-center text-sm font-bold text-slate-500">
        {totalLikes}
      </div>
    </div>
  )
}

export default LikePost
