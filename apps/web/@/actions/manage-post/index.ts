"use server"

import { revalidatePath } from "next/cache"

import { PostStatus } from "database"

import { postSelect, TPostItem } from "@/types/posts"

export const getPostByUserId = async (userId: string): Promise<TPostItem[]> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: postSelect,
    })

    return posts
  } catch (error) {
    throw error
  }
}

export const togglePostStatus = async (postId: string, postStatus: PostStatus): Promise<void> => {
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        postStatus: postStatus === PostStatus.DRAFT ? PostStatus.PUBLISHED : PostStatus.DRAFT,
      },
    })

    revalidatePath("/user/posts")
  } catch (error) {
    throw error
  }
}
