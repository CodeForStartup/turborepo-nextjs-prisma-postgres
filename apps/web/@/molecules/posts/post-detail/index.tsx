import Link from "next/link"

import { TPostItem } from "database"
import { Typography } from "ui"

import APP_ROUTES from "@/constants/routes"
import TagListMeta from "@/molecules/tag/tag-list-meta"
import PostMeta from "@/molecules/user/posts/post-meta"
import { generatePath } from "@/utils/generatePath"

import EditPostButton from "./edit-post-button"
import PostContent from "./post-content"

export type PostDetailProps = {
  post: TPostItem
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="w-full">
      <article className="mb-8 w-full rounded-md border p-8">
        <div className="flex w-full">
          <Typography
            variant="h1"
            className="flex flex-1"
          >
            <Link
              href={generatePath(APP_ROUTES.POST, {
                postId: post?.slug || post?.id,
              })}
            >
              {post?.title}
            </Link>
          </Typography>
          <EditPostButton post={post} />
        </div>

        <PostMeta post={post} />

        <TagListMeta
          tags={post?.tagOnPost?.map((tag) => ({
            id: tag.tag.id,
            slug: tag.tag.slug,
            name: tag.tag.name,
          }))}
          classes={{
            container: "mt-4",
          }}
        />

        <PostContent post={post} />
      </article>
    </div>
  )
}
