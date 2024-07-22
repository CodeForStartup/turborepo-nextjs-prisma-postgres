"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import prisma, { PostStatus, Prisma } from "database"
import slugify from "slugify"

import { FilterValues } from "@/types/filter"
import { postSelect, TCreatePostInput, TPostItem } from "@/types/posts"
import { getServerSession } from "@/utils/auth"

export const getPostById = async (postId: string): Promise<TPostItem> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: postSelect,
    })

    return post
  } catch (error) {
    throw error
  }
}

export const deletePost = async (id: string): Promise<void> => {
  try {
    const session = await getServerSession()

    await prisma.post.delete({
      where: {
        id,
        authorId: session?.user?.id,
      },
      select: postSelect,
    })
  } catch (error) {
    throw error
  } finally {
    revalidatePath("posts")
    revalidatePath(`../../posts/${id}`)
  }
}
