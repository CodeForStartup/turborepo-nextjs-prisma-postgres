"use server"

import prisma from "database"

import { tagItemSelect, TTagItem } from "@/types/tags"

export const getTagById = async (id: string): Promise<TTagItem> => {
  try {
    const tag = await prisma.tags.findFirst({
      where: {
        OR: [
          {
            id,
          },
          {
            slug: id,
          },
        ],
      },
      select: tagItemSelect,
    })

    return tag
  } catch (error) {
    throw error
  }
}
