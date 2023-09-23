"use server";

import prisma, { Prisma } from "database";
import { revalidatePath } from "next/cache";

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
  });

  return post;
};

export const createPost = async (data: Prisma.Post) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: 1, // Temporary until we have authentication
      },
    });

    return post;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (id: number, data: Prisma.Post) => {
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });

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

    revalidatePath("user/posts");

    return post;
  } catch (error) {
    throw error;
  }
};
