import { Image, Prisma } from "@prisma/client"

import prisma from "../prisma"
import { DEFAULT_LIMIT, DEFAULT_PAGE, IActionReturn } from "../shared/type"
import { imageSelect, TImage } from "./selects"
import { IImageFilter, IListImageResponse } from "./type"

export const getImages = async (options: IImageFilter): Promise<IListImageResponse> => {
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, userId, order } = options

  try {
    let where = {}
    if (userId) {
      where = {
        ...where,
        userId: userId,
      }
    }
    const [total, data] = await Promise.all([
      prisma.image.count({ where }),
      prisma.image.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        select: imageSelect,
      }),
    ])

    return {
      data: {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    return {
      error,
      data: {
        data: [],
        totalPages: 0,
        total: 0,
        page: 0,
        limit: 0,
      },
    }
  }
}

export const getImage = async (id: string): Promise<IActionReturn<Image>> => {
  try {
    const image = await prisma.image.findUnique({
      where: { id },
      select: imageSelect,
    })

    if (!image) {
      return {
        error: "NOT_FOUND",
      }
    }

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
  data: Prisma.ImageCreateInput
): Promise<IActionReturn<TImage>> => {
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
  data: Prisma.ImageUpdateInput
): Promise<IActionReturn<TImage>> => {
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

export const deleteImage = async (id: string, userId: string): Promise<IActionReturn<Image>> => {
  try {
    const deleteImage = await prisma.image.delete({
      where: { id, userId },
    })

    if (!deleteImage) {
      return {
        error: "UNAUTHORIZED",
      }
    }

    return {
      data: deleteImage,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
