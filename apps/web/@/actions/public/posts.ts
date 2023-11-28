"use server"

import prisma from "database"

import { postSelect, TPostItem } from "@/types/posts"

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

export const getPostById = async (id: string): Promise<TPostItem> => {
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
