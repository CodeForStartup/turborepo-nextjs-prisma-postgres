"use client"

// import { useRouter } from "next/navigation"
import { PostStatus, TPostItem, updatePost } from "database"
import { updatePostStatus } from "database/src/posts/queries"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"
import { Button } from "ui"

import { onTogglePost } from "@/actions/protect/postAction"

const TogglePost = ({ post }: { post: TPostItem }) => {
  const t = useTranslations()

  return (
    <Button
      type="button"
      variant={post.postStatus === PostStatus.DRAFT ? "destructive" : "default"}
      onClick={() => onTogglePost({ post })}
    >
      {t(post.postStatus === PostStatus.DRAFT ? "common.turn_publish" : "common.turn_draft")}
    </Button>
  )
}

export default TogglePost
