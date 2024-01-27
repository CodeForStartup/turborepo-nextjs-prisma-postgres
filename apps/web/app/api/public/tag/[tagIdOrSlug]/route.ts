import { NextRequest } from "next/server"

import { tagItemSelect } from "@/types/tags"

export async function GET(request: NextRequest, { params }: { params: { tagIdOrSlug: string } }) {
  try {
    const tag = await prisma.tags.findFirst({
      where: {
        OR: [
          {
            id: params.tagIdOrSlug,
          },
          {
            slug: params.tagIdOrSlug,
          },
        ],
      },
      select: tagItemSelect,
    })

    if (!tag)
      return Response.json({
        status: 404,
        message: "Post not found",
      })

    return Response.json(tag, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}
