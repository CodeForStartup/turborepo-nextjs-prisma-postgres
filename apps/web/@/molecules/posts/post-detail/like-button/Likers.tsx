import React from "react"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import FollowerItem from "@/molecules/follower/followers/follower-item"
import Typography from "@/molecules/typography"

interface LikerProps {
  totalLike: number
}

const Liker: React.FC<LikerProps> = ({ totalLike }) => {
  const t = useTranslations()

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
      <DialogContent className="w-[200px]">
        <DialogHeader>
          <Typography variant="h3">{t("common.likers")}</Typography>
        </DialogHeader>

        <FollowerItem
          className="border-none"
          follower={{ id: "1", name: "John Doe", email: "" }}
        />
        <FollowerItem
          className="border-none"
          follower={{ id: "1", name: "John Doe", email: "" }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default Liker
