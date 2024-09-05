import Image from "next/image"
import Link from "next/link"

import { TPostItem } from "database"
import { useTranslations } from "next-intl"
import { Typography } from "ui"

import APP_ROUTES from "@/constants/routes"
import TagListMeta from "@/molecules/tag/tag-list-meta"
import { generatePath } from "@/utils/generatePath"

import CommentButton from "./comment-button"
import LikeButton from "./like-button"
import PostMeta from "./post-meta"

export default function PostItem({ post }: { post: TPostItem }) {
  const t = useTranslations("common")
  console.log(post)

  return (
    <div className="mb-4 flex rounded-sm border px-8 py-4">
      <div className="flex-1">
        <Link
          href={generatePath(APP_ROUTES.POST, {
            postId: post?.slug || post?.id,
          })}
        >
          <Typography
            variant="h2"
            className="hover:underline"
          >
            {post.title || t("untitled")}
          </Typography>
        </Link>

        <PostMeta post={post} />

        <TagListMeta
          tags={post?.tagOnPost?.map((tag) => tag?.tag)}
          classes={{
            container: "mt-2",
          }}
        />

        <div className="mt-2 flex justify-between">
          <div className="flex gap-4">
            <LikeButton post={post} />
            <CommentButton post={post} />
          </div>
        </div>
      </div>
      {post.image && post.image.previewUrl && (
        <div className="flex items-center">
          <Image
            src={post.image.previewUrl}
            alt={post.title}
            width={160}
            height={120}
            className="h-[120px] w-[160px] rounded-sm object-cover"
          />
        </div>
      )}
    </div>
  )
}
