import Link from "next/link"

import APP_ROUTES from "@/constants/routes"
import TagList from "@/molecules/tag/tag-list"
import PostMeta from "@/molecules/user/posts/post-meta"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"
import Comments from "./comments"
import EditPostButton from "./edit-post-button"
import PostContent from "./post-content"

export type PostDetailProps = {
  post: TPostItem
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="w-full">
      <article className="mb-8 w-full rounded bg-white p-8">
        <div className="flex">
          <h1 className="flex flex-1 text-4xl font-extrabold text-slate-700">
            <Link
              href={generatePath(APP_ROUTES.POST, {
                postId: post?.slug || post?.id,
              })}
            >
              {post?.title}
            </Link>
          </h1>
          <EditPostButton post={post} />
        </div>

        <PostMeta post={post} />

        <TagList
          tags={post?.tagOnPost}
          classes={{
            container: "mt-4",
          }}
        />

        <PostContent post={post} />
      </article>
      <Comments />
    </div>
  )
}
