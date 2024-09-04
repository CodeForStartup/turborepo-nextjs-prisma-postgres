import { PostOnUserType, TPostItem } from "database"

import { getTotalActions } from "@/actions/protect/postAction"

import LikeButton from "./LikeButton"
import Liker from "./Likers"

interface LikeButtonProps {
  post: TPostItem
}

export default async function LikeButtonContainer({ post }: LikeButtonProps) {
  const { total, haveAction } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.LIKE,
  })

  return (
    <LikeButton
      post={post}
      totalLike={total}
      isLiked={Boolean(haveAction)}
    >
      <Liker
        totalLike={total}
        post={post}
      />
    </LikeButton>
  )
}
