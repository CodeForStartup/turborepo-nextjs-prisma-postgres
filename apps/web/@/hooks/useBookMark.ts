import { useState } from "react"

import { getSession } from "next-auth/react"
import { toast } from "react-toastify"

import APP_APIS from "@/constants/apis"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

interface BookMarkProps {
  post: TPostItem
}

interface BookMarkState {
  isLoading: boolean
  totalBookMark: number
  isBookMarked: boolean
  bookMark: () => Promise<void>
}

const useBookMark = ({ post }: BookMarkProps): BookMarkState => {
  const [isLoading, setIsLoading] = useState(false)

  const [isBookMarked, setIsBookMarked] = useState(() => {
    return post?.postOnUser?.some(
      (user) => user?.userId === post?.author?.id && user?.type === "BOOKMARK"
    )
  })

  const [totalBookMark, setTotalBookMark] = useState(
    post?.postOnUser?.filter((user) => user?.type === "BOOKMARK").length
  )

  const bookMark = async () => {
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
          action: isBookMarked ? "UNBOOKMARK" : "BOOKMARK",
        }),
      })
      setIsBookMarked((prev) => !prev)
      setTotalBookMark((prev) => (isBookMarked ? prev - 1 : prev + 1))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    totalBookMark,
    isBookMarked,
    isLoading,
    bookMark,
  }
}

export default useBookMark
