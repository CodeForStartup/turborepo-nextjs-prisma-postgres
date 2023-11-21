"use server"

import prisma, { Prisma } from "database"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import slugify from "slugify"

import { getServerSession } from "@/utils/auth"

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
  postOnUser: {
    select: {
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
} satisfies Prisma.PostSelect

const getPostItem = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: postSelect,
})

export type TPostItem = Prisma.PostGetPayload<typeof getPostItem>

export const getPosts = async (): Promise<TPostItem[]> => {
  try {
    const session = await getServerSession()
    const posts = await prisma.post.findMany({
      select: postSelect,
      where: {
        author: {
          id: session?.user?.id,
        },
      },
    })

    return posts
  } catch (error) {
    throw error
  }
}

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

export const createPost = async (data: Prisma.PostCreateInput): Promise<TPostItem> => {
  let newPost: TPostItem
  try {
    const session = await getServerSession()

    const slug = slugify(data.title) + "-" + Math.floor(Math.random() * 1000)

    newPost = await prisma.post.create({
      data: {
        slug: slug,
        title: data.title,
        content: data.content,
        authorId: session?.user?.id,
        tagOnPost: {
          create: data.tags.map((tag) => {
            if (!tag.__isNew__) {
              return {
                tag: {
                  connect: {
                    id: tag.value,
                  },
                },
              }
            }
            return {
              tag: {
                create: {
                  name: tag.label,
                  slug: tag.label.toLowerCase().replace(/\s/g, "-"),
                },
              },
            }
          }),
        },
      },
      select: postSelect,
    })
  } catch (error) {
    throw error
  } finally {
    revalidatePath("posts")
    redirect(`/posts/${newPost?.id}`)
  }
}

export const updatePost = async (id: string, data: Prisma.PostUpdateInput): Promise<TPostItem> => {
  try {
    const session = await getServerSession()
    const { tags, ...postData } = data

    await prisma.post.update({
      where: {
        id,
        authorId: session?.user?.id,
      },
      data: {
        ...postData,
        tagOnPost: {
          deleteMany: {},
          create: tags.map((tag) => {
            if (!tag.__isNew__) {
              return {
                tag: {
                  connect: {
                    id: tag.value,
                  },
                },
              }
            }
            return {
              tag: {
                create: {
                  name: tag.label,
                  slug: tag.label.toLowerCase().replace(/\s/g, "-"),
                },
              },
            }
          }),
        },
      },
      select: postSelect,
    })
    revalidatePath("posts")
    revalidatePath(`posts/${id}`)
  } catch (error) {
    throw error
  } finally {
    redirect(`../../../posts/${id}`)
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
