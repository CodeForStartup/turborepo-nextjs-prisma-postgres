import prisma from "database"
import { NextRequest, NextResponse } from "next/server"

import { postSelect } from "@/actions/public/posts"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query")
  try {
    const posts = await prisma.post.findMany({
      where: {
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
      },
      select: postSelect,
    })

    return NextResponse.json(posts)
  } catch (error) {
    throw error
  }
}
