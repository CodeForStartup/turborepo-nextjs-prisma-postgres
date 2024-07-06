"use server"

import { revalidatePath } from "next/cache"

import { PostOnUserType, PostStatus, TPostItem } from "database"
import { updatePostStatus } from "database/src/posts/queries"
import { toast } from "react-toastify"

import { TUserItem, userSelect } from "@/types/users"
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
    const promises = []

    promises.push(
      prisma.postOnUser.count({
        where: {
          postId,
          type: actionType,
        },
      })
    )

    if (session?.user?.id) {
      promises.push(
        prisma.postOnUser.findFirst({
          where: {
            postId,
            userId: session?.user?.id,
            type: actionType,
          },
        })
      )
    }

    const [total, haveAction] = await Promise.all(promises)

    return { total, haveAction }
  } catch (error) {
    throw error
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
  const postField = action === PostOnUserType.LIKE ? "totalLike" : "totalFollow"
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
    throw error
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
  const postField = action === PostOnUserType.LIKE ? "totalLike" : "totalFollow"

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
    throw error
  }
}

export const getLikers = async ({ postId }: { postId: string }) => {
  try {
    const likers: TUserItem[] = await prisma.user.findMany({
      where: {
        postOnUser: {
          some: {
            postId,
            type: PostOnUserType.LIKE,
          },
        },
      },
      select: userSelect,
    })

    return {
      data: likers,
      errorMessage: "",
    }
  } catch (error) {
    return { data: [], errorMessage: "Error fetching likers" }
  }
}

export const onTogglePost = async ({ post }: { post: TPostItem }) => {
  try {
    await updatePostStatus(
      post.id,
      post.postStatus === PostStatus.DRAFT ? PostStatus.PUBLISHED : PostStatus.DRAFT,
      post?.author?.id
    )
  } catch (error) {
    toast.error(error)
  } finally {
    revalidatePath(`/post/${post.slug}`)
  }
}
