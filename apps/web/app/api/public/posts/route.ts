import prisma from "database"
import { NextRequest } from "next/server"

import { postSelect } from "@/types/posts"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""

  try {
    const posts = await prisma.post.findMany({
      select: postSelect,
    })

    return Response.json(posts)
  } catch (error) {
    throw error
  }
}
