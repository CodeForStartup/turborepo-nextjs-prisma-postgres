import LikeButton from "./like-button"

const LikePost = async ({ postId }: { postId: string; totalLikes: number }) => {
  return (
    <div className="mb-6">
      <LikeButton postId={postId} isLiked={false} />
      <div className="flex items-center justify-center text-sm font-bold text-slate-500">10</div>
    </div>
  )
}

export default LikePost
