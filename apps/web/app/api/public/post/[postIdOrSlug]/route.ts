import { NextRequest } from "next/server"

import { postSelect } from "@/types/posts"

export async function GET(request: NextRequest, { params }: { params: { postIdOrSlug: string } }) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          {
            id: params.postIdOrSlug,
          },
          {
            slug: params.postIdOrSlug,
          },
        ],
      },
      select: postSelect,
    })

    if (!post)
      return Response.json({
        status: 404,
        message: "Post not found",
      })

    return Response.json(post, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}
