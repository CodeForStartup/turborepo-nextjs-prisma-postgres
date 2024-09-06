import React from "react"
import Link from "next/link"

import { auth } from "configs/auth"
import { PostStatus } from "database"
import { updatePostStatus } from "database/src/posts/queries"
import { LucideEdit } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Button, buttonVariants, cn, toast } from "ui"

import { onTogglePost } from "@/actions/protect/postAction"
import APP_ROUTES from "@/constants/routes"
import { TPostItem } from "@/types/posts"

import TogglePost from "./toggle-post"

interface EditPostButtonProps {
  post: TPostItem
}

const EditPostButton: React.FC<EditPostButtonProps> = async ({ post }) => {
  const session = await auth()
  const t = await getTranslations()

  if (post?.author?.id !== session?.user?.id) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <TogglePost post={post} />
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
