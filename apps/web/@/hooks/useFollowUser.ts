"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { toast } from "react-toastify"

import APP_APIS from "@/constants/apis"
import { generatePath } from "@/utils/generatePath"

const useFollowUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    const checkIfUserIsFollowed = async () => {
      const followStatusRaw = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${generatePath(
          APP_APIS.protected.user.GET_FOLLOWER_STATUS,
          { userId: params?.authorId }
        )}`,
        {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const followStatus = await followStatusRaw.json()

      if (isMounted) {
        setIsFollowing(followStatus?.isFollowing)
      }
    }

    checkIfUserIsFollowed()

    return () => {
      isMounted = false
    }
  }, [params?.authorId])

  const onFollowUser = async (authorId: string) => {
    setIsLoading(true)
    try {
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
    } catch (error) {
      toast.error("Failed to follow user")
    } finally {
      setIsLoading(false)
      setIsFollowing(!isFollowing)
      router.refresh()
    }
  }

  return {
    isLoading,
    isFollowing,
    onFollowUser,
  }
}

export default useFollowUser
