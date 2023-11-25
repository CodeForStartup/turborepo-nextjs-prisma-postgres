"use server"

import prisma, { Prisma } from "database"
import { revalidatePath } from "next/cache"

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
      image: true,
    },
  },
  postOnUser: {
    select: {
      userId: true,
      type: true,
    },
  },
  tagOnPost: {
    select: {
      tag: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
  Comment: {
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
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

export const getTotalLikes = async (postId: string): Promise<number> => {
  try {
    const totalLikes = await prisma.postOnUser.count({
      where: {
        postId,
        type: "LIKE",
      },
    })

    return totalLikes
  } catch (error) {
    throw error
  }
}

export const likePost = async (postId: string, userId: string): Promise<TPostItem> => {
  let post = null
  try {
    post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        postOnUser: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath(`posts/${postId}`)
  return post
}

export const unlikePost = async (postId: string, userId: string): Promise<TPostItem> => {
  let post = null
  try {
    post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        postOnUser: {
          delete: [
            {
              userId_postId: {
                userId,
                postId,
              },
            },
          ],
        },
      },
    })
  } catch (error) {
    throw error
  }
  revalidatePath(`posts/${postId}`)
  return post
}
