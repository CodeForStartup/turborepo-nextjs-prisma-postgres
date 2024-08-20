import { Image } from "@prisma/client"

import prisma from "../prisma"
import { ActionReturnType, DEFAULT_LIMIT, DEFAULT_PAGE, TGetListResponse } from "../shared/type"
import { imageSelect } from "./selects"
import { TImageFilter, TListImageResponse } from "./type"

export const getImages = async (
  options: TImageFilter = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    userId: undefined,
    orderBy: "updatedAt",
    order: "desc",
  }
): Promise<TListImageResponse> => {
  try {
    let where = {}
    if (options.userId) {
      where = {
        ...where,
        userId: options.userId,
      }
    }

    if (options.search) {
      where = {
        ...where,
        name: {
          contains: options.search,
          mode: "insensitive",
        },
      }
    }

    let orderBy = {}

    if (options.orderBy) {
      orderBy = {
        ...orderBy,
        [options.orderBy]: options.order,
      }
    }

    const [total, data] = await Promise.all([
      prisma.image.count({ where }),
      prisma.image.findMany({
        where,
        orderBy,
        take: options.limit,
        skip: options.page,
        select: imageSelect,
      }),
    ])

    return {
      data: {
        data,
        total,
        page: options.page ?? DEFAULT_PAGE,
        limit: options.limit ?? DEFAULT_LIMIT,
      },
    }
  } catch (error) {
    return {
      error,
      data: {
        data: [],
        total: 0,
        page: 0,
        limit: 0,
      },
    }
  }
}

export const getImage = async (id: string): Promise<ActionReturnType<Image>> => {
  try {
    const image = await prisma.image.findUnique({
      where: { id },
      select: imageSelect,
    })

    return {
      data: image,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const createImage = async (
  data: Omit<Image, "id" | "createdAt" | "updatedAt">
): Promise<ActionReturnType<Image>> => {
  try {
    const image = await prisma.image.create({
      data,
    })

    return {
      data: image,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const updateImage = async (
  id: string,
  data: Partial<Omit<Image, "id" | "createdAt" | "updatedAt">>
): Promise<ActionReturnType<Image>> => {
  try {
    const image = await prisma.image.update({
      where: { id },
      data,
    })

    return {
      data: image,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const deleteImage = async (id: string): Promise<ActionReturnType<"">> => {
  try {
    await prisma.image.delete({
      where: { id },
    })

    return {
      data: "",
    }
  } catch (error) {
    return {
      error,
    }
  }
}
