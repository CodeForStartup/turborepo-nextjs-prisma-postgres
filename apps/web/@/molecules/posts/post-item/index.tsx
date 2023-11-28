import Link from "next/link"

import APP_ROUTES from "@/constants/routes"
import TagList from "@/molecules/tag/tag-list"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"
import BookmarkButton from "./bookmark-button"
import CommentButton from "./comment-button"
import LikeButton from "./like-button"
import PostMeta from "./post-meta"

export default function PostItem({ post }: { post: TPostItem }) {
  return (
    <div className="mb-4 flex rounded-sm bg-white px-8 py-4">
      <div className="flex-1">
        <Link
          href={generatePath(APP_ROUTES.POST, {
            postId: post?.id,
          })}
        >
          <h2 className="flex flex-1 text-2xl font-bold text-slate-700 hover:underline">
            {post.title}
          </h2>
        </Link>

        <PostMeta post={post} />

        <TagList
          tags={post?.tagOnPost}
          classes={{
            container: "mt-2",
          }}
        />

        <div className="mt-2 flex justify-between">
          <div className="flex gap-4">
            <LikeButton post={post} />
            <CommentButton post={post} />
          </div>
          <BookmarkButton post={post} />
        </div>
      </div>
    </div>
  )
}
