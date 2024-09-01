"use client"

import Link from "next/link"

import { deletePost, PostStatus, TPostItem } from "database"
import dayjs from "dayjs"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import {
  Badge,
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from "ui"

import { togglePostStatus } from "@/actions/manage-post"

export default function PostItem(post: TPostItem) {
  const t = useTranslations()
  const { data: session } = useSession()

  const onDeletePost = async () => {
    await deletePost(post.id, session?.user?.id)
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
        <Link
          className={buttonVariants({
            variant: "link",
            className: "ml-2",
          })}
          href={`/user/posts/${post.id}/edit`}
        >
          {t("common.edit")}
        </Link>
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
