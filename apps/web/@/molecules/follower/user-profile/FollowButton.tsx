"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import APP_APIS from "@/constants/apis"
import { generatePath } from "@/utils/generatePath"

const FollowButton: React.FC<{ authorId: string }> = ({ authorId }: { authorId: string }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const t = useTranslations()
  const params = useParams()

  const handleFollow = async () => {
    setIsFollowing(true)

    await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath(
        APP_APIS.protected.user.TOGGLE_FOLLOWER,
        { userId: params?.authorId }
      )}`,
      {
        method: "POST",
        body: JSON.stringify({
          followerId: authorId,
          action: "follow",
        }),
      }
    )

    setIsFollowing(false)
  }

  return (
    <Button
      className="mt-4 w-full"
      variant="outline"
      disabled={isFollowing}
      onClick={handleFollow}
    >
      {params?.userId}
      {t("common.follow").toUpperCase()}
    </Button>
  )
}

export default FollowButton
