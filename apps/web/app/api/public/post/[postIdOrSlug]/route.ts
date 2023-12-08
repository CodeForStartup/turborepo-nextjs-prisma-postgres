import { PostStatus } from "database"
import { NextRequest } from "next/server"

import { postSelect } from "@/types/posts"

export async function GET(request: NextRequest, { params }: { params: { postIdOrSlug: string } }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        // postStatus: PostStatus.PUBLISHED,
        id: params.postIdOrSlug,
        OR: [
          {
            id: params.postIdOrSlug,
          },
        ],
      },
      select: postSelect,
    })

    return Response.json(post)
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
