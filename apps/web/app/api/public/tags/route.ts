import prisma from "database"
import { NextRequest } from "next/server"

import { DEFAULT_TAG_LIMIT } from "@/constants"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const page = newUrl.searchParams.get("page") || 0
  const limit = newUrl.searchParams.get("limit") || DEFAULT_TAG_LIMIT

  try {
    const tags = await prisma.tags.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        _count: {
          select: {
            tagOnPost: true,
          },
        },
      },
      take: Number(limit),
      skip: Number(page) * Number(limit),
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    })

    return Response.json(tags)
  } catch (error) {
    throw error
  }
}
