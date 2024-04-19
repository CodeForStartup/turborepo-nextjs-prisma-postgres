"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import prisma, { PostStatus, Prisma } from "database"
import slugify from "slugify"

import { FilterValues } from "@/types/filter"
import { postSelect, TCreatePostInput, TPostItem } from "@/types/posts"
import { getServerSession } from "@/utils/auth"

export const getPosts = async ({ searchParams }: TGetPostsParams): Promise<TGetPostsResponse> => {
  const sessions = await getServerSession()
  if (!sessions) {
    redirect("/sign-in")
  }

  const searchTerm = searchParams?.query || ""
  const filter = searchParams?.filter || FilterValues.LASTED // lasted or hot
  const limit = searchParams?.limit || 20
  const page = searchParams?.page || 1
  const authorId = searchParams?.authorId || ""
  const postStatus = searchParams?.postStatus || ""

  let where: Prisma.PostWhereInput = {
    authorId: sessions?.user?.id,
  }

  let orderBy = {}

  if (postStatus) {
    where = {
      ...where,
      postStatus,
    }
  }

  if (authorId) {
    where = {
      ...where,
      authorId,
    }
  }

  if (filter === FilterValues.HOT) {
    orderBy = {
      ...orderBy,
      comments: {
        _count: "desc",
      },
    }
  }

  if (filter === FilterValues.LASTED) {
    orderBy = {
      ...orderBy,
      updatedAt: "desc",
    }
  }

  if (searchTerm) {
    where = {
      ...where,
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    }
  }

  try {
    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        select: postSelect,
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        orderBy,
      }),
    ])

    return {
      data: posts,
      total: total,
      page: Number(page),
      limit: Number(limit),
    }
  } catch (error) {
    return {
      data: [],
      total: 0,
      page: Number(page),
      limit: Number(limit),
    }
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

export const createPost = async (data: TCreatePostInput): Promise<TPostItem> => {
  let newPost: TPostItem
  try {
    const session = await getServerSession()

    const slug = slugify(data.title.toLocaleLowerCase()) + "-" + Date.now()

    newPost = await prisma.post.create({
      data: {
        slug: slug,
        title: data.title,
        content: data.content,
        authorId: session?.user?.id,
        postStatus: PostStatus.PUBLISHED,
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

export const updatePost = async (id: string, data: TCreatePostInput): Promise<TPostItem> => {
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
