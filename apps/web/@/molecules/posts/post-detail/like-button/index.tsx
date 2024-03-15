import { PostOnUserType } from "database"

import { getTotalActions } from "@/actions/protect/postAction"
import { TPostItem } from "@/types/posts"

import LikeButton from "./LikeButton"

type LikeButtonProps = {
  post: TPostItem
}

const LikeButtonContainer: React.FC<LikeButtonProps> = async ({ post }: LikeButtonProps) => {
  const { total, haveAction } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.LIKE,
  })

  return (
    <LikeButton
      post={post}
      totalLike={total}
      isLiked={Boolean(haveAction)}
    />
  )
}

export default LikeButtonContainer
