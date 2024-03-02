"use server"

import { revalidatePath } from "next/cache"

import { PostOnUserType } from "database"
import { toast } from "react-toastify"

import { TPostItem } from "@/types/posts"
import { getServerSession } from "@/utils/auth"

export const getTotalLike = async (postId: string) => {
  const session = await getServerSession()

  try {
    const totalLike = await prisma.postOnUser.count({
      where: {
        postId,
        type: PostOnUserType.LIKE,
      },
    })

    const isLiked = session?.user?.id
      ? await prisma.postOnUser.findFirst({
          where: {
            postId,
            userId: session?.user?.id,
            type: PostOnUserType.LIKE,
          },
        })
      : false

    return { totalLike, isLiked }
  } catch (error) {
    toast.error("Error getting total like")
  }
}

export const likePost = async ({ post }: { post: TPostItem }) => {
  const session = await getServerSession()

  try {
    await prisma.postOnUser.upsert({
      where: {
        userId_postId_type: {
          postId: post.id,
          userId: session?.user?.id,
          type: PostOnUserType.LIKE,
        },
      },
      update: {
        postId: post.id,
        userId: session?.user?.id,
        type: PostOnUserType.LIKE,
      },
      create: {
        postId: post.id,
        userId: session?.user?.id,
        type: PostOnUserType.LIKE,
      },
    })

    revalidatePath(`/post/${post?.slug}`)
  } catch (error) {
    toast.error("Error liking post")
  }
}

export const unLikePost = async ({ post }: { post: TPostItem }) => {
  const session = await getServerSession()

  try {
    await prisma.postOnUser.delete({
      where: {
        userId_postId_type: {
          postId: post?.id,
          userId: session?.user?.id,
          type: PostOnUserType.LIKE,
        },
      },
    })

    revalidatePath(`/post/${post?.slug}`)
  } catch (error) {
    toast.error("Error unliking post")
  }
}
