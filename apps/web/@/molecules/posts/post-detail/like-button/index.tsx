import { PostOnUserType } from "database"

import { getTotalActions } from "@/actions/protected/postAction"
import { TPostItem } from "@/types/posts"

import LikeButton from "./LikeButton"

type LikeButtonProps = {
  post: TPostItem
}

const LikeButtonContainer: React.FC<LikeButtonProps> = async ({ post }: LikeButtonProps) => {
  const { totalLike, isLiked } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.LIKE,
  })

  return (
    <LikeButton
      post={post}
      totalLike={totalLike}
      isLiked={Boolean(isLiked)}
    />
  )
}

export default LikeButtonContainer
