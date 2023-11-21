import prisma from "database"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const searchTerm = newUrl.searchParams.get("query") || ""

  try {
    const posts = await prisma.post.findMany({
      where: {
        title: {
          search: searchTerm,
          mode: "insensitive",
        },
        content: {
          search: searchTerm,
          mode: "insensitive",
        },
        postStatus: {
          equals: "PUBLISHED",
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        postOnUser: {
          select: {
            userId: true,
            type: true,
          },
        },
        tagOnPost: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    })

    return Response.json(posts)
  } catch (error) {
    throw error
  }
}
