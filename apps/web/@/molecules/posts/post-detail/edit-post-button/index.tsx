import React from "react"
import Link from "next/link"

import { PostStatus } from "database"
import { LucideEdit } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Button, buttonVariants, cn } from "ui"

import APP_ROUTES from "@/constants/routes"
import { TPostItem } from "@/types/posts"
import { getServerSession } from "@/utils/auth"

interface EditPostButtonProps {
  post: TPostItem
}

const EditPostButton: React.FC<EditPostButtonProps> = async ({ post }) => {
  const session = await getServerSession()
  const t = await getTranslations()

  if (post?.author?.id !== session?.user?.id) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="destructive">
        {t(
          post.postStatus === PostStatus.DRAFT
            ? t("common.turn_publish").toUpperCase()
            : t("common.turn_draft").toLocaleUpperCase()
        )}
      </Button>
      <Link
        href={APP_ROUTES.EDIT_POST.replace(":postId", post.id)}
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "aspect-square p-0"
        )}
      >
        <LucideEdit className="h-5 w-5" />
      </Link>
    </div>
  )
}

export default EditPostButton
