"use server";

import prisma from "database";

export interface IPostForm {
  title: string;
  content: string;
}

export const getPosts = async () => {
  const posts = await prisma.post.findMany();

  return posts;
};

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return post;
};

export const createPost = async (data: IPostForm) => {
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
