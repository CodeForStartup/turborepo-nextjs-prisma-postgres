"use server"

import { revalidatePath } from "next/cache"

import { PostOnUserType } from "database"
import { toast } from "react-toastify"

import { getServerSession } from "@/utils/auth"

export const getTotalActions = async ({
  postId,
  actionType,
}: {
  postId: string
  actionType: PostOnUserType
}) => {
  const session = await getServerSession()

  try {
    const totalLike = await prisma.postOnUser.count({
      where: {
        postId,
        type: actionType,
      },
    })

    const isLiked = session?.user?.id
      ? await prisma.postOnUser.findFirst({
          where: {
            postId,
            userId: session?.user?.id,
            type: actionType,
          },
        })
      : false

    return { totalLike, isLiked }
  } catch (error) {
    toast.error("Error getting total like")
  }
}

export const addRelation = async ({
  postId,
  postSlug,
  action,
}: {
  postId: string
  postSlug: string
  action: PostOnUserType
}) => {
  const session = await getServerSession()
  const postField = action === PostOnUserType.LIKE ? "totalLike" : "totalFollower"
  try {
    await prisma.$transaction([
      prisma.postOnUser.upsert({
        where: {
          userId_postId_type: {
            postId: postId,
            userId: session?.user?.id,
            type: action,
          },
        },
        update: {
          postId: postId,
          userId: session?.user?.id,
          type: action,
        },
        create: {
          postId: postId,
          userId: session?.user?.id,
          type: action,
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: {
          [postField]: {
            increment: 1,
          },
        },
      }),
    ])

    revalidatePath(`/post/${postSlug}`)
  } catch (error) {
    toast.error("Error liking post")
  }
}

export const removeRelation = async ({
  postId,
  postSlug,
  action,
}: {
  postId: string
  postSlug: string
  action: PostOnUserType
}) => {
  const session = await getServerSession()
  const postField = action === PostOnUserType.LIKE ? "totalLike" : "totalFollower"
  try {
    await prisma.$transaction([
      prisma.postOnUser.delete({
        where: {
          userId_postId_type: {
            postId: postId,
            userId: session?.user?.id,
            type: action,
          },
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: {
          [postField]: {
            decrement: 1,
          },
        },
      }),
    ])

    revalidatePath(`/post/${postSlug}`)
  } catch (error) {
    toast.error("Error unliking post")
  }
}
