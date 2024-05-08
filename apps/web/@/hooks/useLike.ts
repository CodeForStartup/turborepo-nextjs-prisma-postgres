import { useState } from "react"

import { getSession } from "next-auth/react"
import { toast } from "react-toastify"

import APP_APIS from "@/constants/apis"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

type UseLikeProps = {
  post: TPostItem
}

type UseLikeReturn = {
  isLoading: boolean
  totalLike: number | undefined
  isLiked: boolean | undefined
  likePost: () => Promise<void>
}

const useLike = ({ post }: UseLikeProps): UseLikeReturn => {
  const [isLoading, setIsLoading] = useState(false)

  const [totalLike, setTotalLike] = useState(
    post?.postOnUser?.filter((user) => user?.type === "LIKE").length
  )

  const [isLiked, setIsLiked] = useState(() => {
    return post?.postOnUser?.some(
      (user) => user?.userId === post?.author?.id && user?.type === "LIKE"
    )
  })

  const likePost = async () => {
    const session = await getSession()

    if (!session) {
      toast.error("You must be logged in to like a post")
      return
    }

    try {
      setIsLoading(true)
      await fetch(generatePath(APP_APIS.protected.post.ACTIONS, { postId: post?.id }), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isLiked ? "UNLIKE" : "LIKE",
          postId: post?.id,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error.message)
        })

      setIsLiked((prev) => !prev)
      setTotalLike((prev) => (isLiked ? prev - 1 : prev + 1))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { totalLike, isLiked, isLoading, likePost }
}

export default useLike
