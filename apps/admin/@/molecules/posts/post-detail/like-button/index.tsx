import { PostOnUserType } from "database";

import { getTotalActions } from "@/actions/protect/postAction";
import { TPostItem } from "@/types/posts";

import LikeButton from "./LikeButton";
import Liker from "./Likers";

type LikeButtonProps = {
  post: TPostItem;
};

const LikeButtonContainer: React.FC<LikeButtonProps> = async ({
  post,
}: LikeButtonProps) => {
  const { total, haveAction } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.LIKE,
  });

  return (
    <LikeButton post={post} totalLike={total} isLiked={Boolean(haveAction)}>
      <Liker totalLike={total} post={post} />
    </LikeButton>
  );
};

export default LikeButtonContainer;
