import prisma from "database"
import { NextRequest } from "next/server"

import { postSelect } from "@/types/posts"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""
  const tag = newUrl.searchParams.get("tag") || ""

  let where = {}

  if (tag) {
    where = {
      ...where,
      tagOnPost: {
        some: {
          tag: {
            id: tag,
          },
        },
      },
    }
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
          body: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    }
  }

  try {
    const posts = await prisma.post.findMany({
      select: postSelect,
      where,
    })

    return Response.json(posts)
  } catch (error) {
    throw error
  }
}
