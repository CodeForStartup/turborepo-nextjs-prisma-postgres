import { useState } from "react"
import { useParams } from "next/navigation"

import { toast } from "react-toastify"

import APP_APIS from "@/constants/apis"
import { generatePath } from "@/utils/generatePath"

const useFollowUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams()

  const followUser = async (authorId: string) => {
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
    }
  }

  return {
    isLoading,
    followUser,
  }
}

export default useFollowUser
