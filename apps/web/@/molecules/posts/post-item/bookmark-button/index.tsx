import React from "react"

import { PostOnUserType, TPostItem } from "database"

import { getTotalActions } from "@/actions/protect/postAction"

import BookmarkButton from "./BookmarkButton"

type BookmarkButtonContainerProps = {
  post: TPostItem
  showCount?: boolean
}

const BookmarkButtonContainer: React.FC<BookmarkButtonContainerProps> = async ({
  post,
  showCount,
}) => {
  const { total, haveAction } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.BOOKMARK,
  })

  return (
    <BookmarkButton
      post={post}
      totalBookmark={total}
      isBookmarked={Boolean(haveAction)}
      showCount={showCount}
    />
  )
}

export default BookmarkButtonContainer
