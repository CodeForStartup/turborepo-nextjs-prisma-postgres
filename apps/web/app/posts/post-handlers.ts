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

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany();

    return posts;
  } catch (error) {
    // should show notification to user
    return [];
  }
};

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: postSelect,
  });

  return post;
};

export const createPost = async (data: Prisma.PostCreateInput) => {
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

export const updatePost = async (id: number, data: Prisma.PostUpdateInput) => {
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

export const deletePost = async (id: number) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    return post;
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("user/posts");
    revalidatePath(`user/posts/${id}`);
  }
};
