"use server"

import prisma from "database"

import { tagItemSelect, TTagItem } from "@/types/tags"

export const getTagById = async (id: string): Promise<TTagItem> => {
  try {
    const tag = await prisma.tags.findUnique({
      where: {
        id,
      },
      select: tagItemSelect,
    })

    return tag
  } catch (error) {
    throw error
  }
}
