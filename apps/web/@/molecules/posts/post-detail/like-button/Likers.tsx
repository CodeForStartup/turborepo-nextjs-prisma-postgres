import React, { use } from "react"

import { useTranslations } from "next-intl"
import { Button, Dialog, DialogContent, DialogHeader, DialogTrigger, Typography } from "ui"

import { getLikers } from "@/actions/protect/postAction"
import FollowerItem from "@/molecules/follower/followers/follower-item"
import { TPostItem } from "@/types/posts"

interface LikerProps {
  totalLike: number
  post: TPostItem
}

export default function Liker({ totalLike, post }: LikerProps) {
  const t = useTranslations()

  const { data: likers } = use(
    getLikers({
      postId: post.id,
    })
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="h-8 text-lg font-bold"
        >
          {totalLike}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-[200px] w-[320px]">
        <DialogHeader>
          <Typography variant="h3">{t("common.likers")}</Typography>
        </DialogHeader>

        {likers?.map((liker) => (
          <FollowerItem
            key={liker.id}
            className="border-none p-0"
            user={liker}
            showFollowButton={false}
          />
        ))}
      </DialogContent>
    </Dialog>
  )
}
