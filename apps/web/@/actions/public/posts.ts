"use server";

import prisma, { PostStatus, Prisma } from "database";
import dayjs from "dayjs";

import { FilterValues, PeriodValues } from "@/types/filter";
import { postSelect, TPostItem } from "@/types/posts";

export type TGetPostsResponse = {
  data: TPostItem[];
  total: number;
  page: number;
  limit: number;
};

export type TGetPostsParams = {
  searchParams: {
    search?: string;
    tag?: string;
    filter?: string;
    period?: string;
    limit?: string;
    page?: string;
    authorId?: string;
    postStatus?: PostStatus;
  };
};

export const getPost = async ({ postIdOrSlug }): Promise<TPostItem> => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          {
            id: postIdOrSlug,
          },
          {
            slug: postIdOrSlug,
          },
        ],
      },
      select: postSelect,
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    return null;
  }
};

export const getPosts = async ({
  searchParams,
}: TGetPostsParams): Promise<TGetPostsResponse> => {
  const searchTerm = searchParams?.search || "";
  const tag = searchParams?.tag || "";
  const filter = searchParams?.filter || FilterValues.LASTED; // lasted or hot
  const period = searchParams?.period || PeriodValues.INFINITY; // lasted or hot
  const limit = searchParams?.limit || 10;
  const page = searchParams?.page || 1;
  const authorId = searchParams?.authorId || "";

  let where: Prisma.PostWhereInput = {
    postStatus: PostStatus.PUBLISHED,
  };

  let orderBy = {};

  if (authorId) {
    where = {
      ...where,
      authorId,
    };
  }

  if (filter === FilterValues.HOT) {
    if (period === PeriodValues.THIS_MONTH) {
      where = {
        ...where,
        updatedAt: {
          gte: dayjs().subtract(30, "day").toDate(),
        },
      };
    }

    if (period === PeriodValues.THIS_WEEK) {
      where = {
        ...where,
        updatedAt: {
          gte: dayjs().subtract(7, "day").toDate(),
        },
      };
    }

    orderBy = {
      ...orderBy,
      comments: {
        _count: "desc",
      },
    };
  }

  if (filter === FilterValues.LASTED) {
    orderBy = {
      ...orderBy,
      updatedAt: "desc",
    };
  }

  if (tag) {
    where = {
      ...where,
      tagOnPost: {
        some: {
          tag: {
            OR: [{ id: tag }, { slug: tag }],
          },
        },
      },
    };
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
    };
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
    ]);

    return {
      data: posts,
      total: total,
      page: Number(page),
      limit: Number(limit),
    };
  } catch (error) {
    return {
      data: [],
      total: 0,
      page: Number(page),
      limit: Number(limit),
    };
  }
};
