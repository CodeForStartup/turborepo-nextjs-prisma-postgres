"use server"

import prisma, { Prisma } from "database"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const postSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} satisfies Prisma.PostSelect

const getPostItem = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: postSelect,
})

export type TPostItem = Prisma.PostGetPayload<typeof getPostItem>

export const getPosts = async (): Promise<TPostItem[]> => {
  try {
    const posts = await prisma.post.findMany({
      select: postSelect,
    })

    return posts
  } catch (error) {
    throw error
  }
}

export const getPostById = async (id: number): Promise<TPostItem> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: postSelect,
    })

    return post
  } catch (error) {
    throw error
  }
}
