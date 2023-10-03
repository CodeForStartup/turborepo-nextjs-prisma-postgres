"use server";

import prisma, { Prisma } from "database";
import { revalidatePath } from "next/cache";

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
} satisfies Prisma.PostSelect;

const getPostItem = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: postSelect,
});

export type TPostItem = Prisma.PostGetPayload<typeof getPostItem>;

export const getPosts = async (): Promise<TPostItem[]> => {
  try {
    const posts = await prisma.post.findMany({
      select: postSelect,
    });

    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id: number): Promise<TPostItem> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: postSelect,
    });

    return post;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (
  data: Prisma.PostCreateInput
): Promise<TPostItem> => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: 1, // Temporary until we have authentication
      },
      select: postSelect,
    });

    revalidatePath("user/posts");
    revalidatePath(`user/posts/${newPost.id}`);
    return newPost;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (
  id: number,
  data: Prisma.PostUpdateInput
): Promise<TPostItem> => {
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
      select: postSelect,
    });

    revalidatePath("user/posts");
    revalidatePath(`user/posts/${id}`);

    return post;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: number): Promise<TPostItem> => {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
      select: postSelect,
    });

    revalidatePath("user/posts");
    revalidatePath(`user/posts/${id}`);

    return post;
  } catch (error) {
    throw error;
  }
};
