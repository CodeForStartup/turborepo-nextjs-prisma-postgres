import React from "react"

import { useTranslations } from "next-intl"

import { getLikers } from "@/actions/protect/postAction"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import FollowerItem from "@/molecules/follower/followers/follower-item"
import Typography from "@/molecules/typography"
import { TPostItem } from "@/types/posts"

interface LikerProps {
  totalLike: number
  post: TPostItem
}

const Liker: React.FC<LikerProps> = async ({ totalLike, post }) => {
  const t = useTranslations()

  const { data: likers } = await getLikers({
    postId: post.id,
  })

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

export default Liker
