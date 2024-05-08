"use client"

import Link from "next/link"

import { PostStatus } from "database"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"

import { togglePostStatus } from "@/actions/manage-post"
import { deletePost } from "@/actions/protect/posts"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Typography from "@/molecules/typography"
import { TPostItem } from "@/types/posts"

import { Button } from "./button"

export default function PostItem(post: TPostItem) {
  const t = useTranslations()

  const onDeletePost = async () => {
    await deletePost(post.id)
  }

  const onTogglePostStatus = async () => {
    await togglePostStatus(post.id, post.postStatus)
  }

  return (
    <div className="mb-4 flex items-center justify-center rounded border p-4 hover:bg-slate-100 dark:hover:bg-slate-900">
      <div className="flex-1">
        <Link href={`posts/${post.id}/edit`}>
          <Typography
            variant="h2"
            className="hover:underline"
          >
            {post.title}
          </Typography>
          <div className="mt-1 flex items-center gap-4 text-xs">
            <Badge variant={post?.postStatus === PostStatus.DRAFT ? "destructive" : "secondary"}>
              {post?.postStatus}
            </Badge>
            <Typography variant="span">
              Last edited: <time>{dayjs(post.createdAt).format("MMMM D, YYYY")}</time>
            </Typography>
          </div>
        </Link>

        <div className="mt-2 flex gap-8">
          <div className="flex items-center gap-2">
            <i className="ri-heart-fill text-[tomato]" />
            <Typography
              variant="span"
              className="text-sm"
            >
              {post?.totalLike}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-bookmark-3-line text-blue-900" />
            <Typography
              variant="span"
              className="text-sm"
            >
              {post?.totalFollow}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-message-2-line" />
            <Typography
              variant="span"
              className="text-sm"
            >
              {post?._count?.comments}
            </Typography>
          </div>
        </div>
      </div>

      <div className="">
        <Button
          variant="link"
          onClick={onTogglePostStatus}
        >
          {t(post?.postStatus === "DRAFT" ? "common.publish" : "common.draft")}
        </Button>
        <Button variant="link">{t("common.edit")}</Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <i className="ri-more-2-fill" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/user/posts/${post.id}/preview`}>{t("common.preview")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeletePost}>
              <div className="flex gap-1 text-red-700 hover:text-red-700">
                <i className="ri-delete-bin-line" />
                {t("common.delete")}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
