import { getTotalLikes, isLiked } from "@/actions/public/posts"
import { getServerSession } from "@/utils/auth"
import LikeButton from "./like-button"

const LikePost = async ({ postId }: { postId: string; totalLikes: number }) => {
  const sessions = await getServerSession()
  let isUserLiked = false

  const totalLikes = await getTotalLikes(postId)
  if (sessions?.user?.id) {
    isUserLiked = await isLiked(postId, sessions?.user?.id)
  }

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
