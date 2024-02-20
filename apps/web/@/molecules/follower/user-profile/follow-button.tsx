"use client"

import React from "react"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import useFollowUser from "@/hooks/useFollowUser"

const FollowButton: React.FC<{ authorId: string }> = ({ authorId }: { authorId: string }) => {
  const t = useTranslations()

  const { isLoading, followUser } = useFollowUser()

  return (
    <Button
      className="mt-4 w-full"
      variant="outline"
      disabled={isLoading}
      onClick={() => followUser(authorId)}
    >
      {t("common.follow").toUpperCase()}
    </Button>
  )
}

export default FollowButton
