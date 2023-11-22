import prisma from "database"
import { getSession } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const session = await getSession({ req: request.nextRequest })
  if (!session) {
    return Response.unauthorized()
  }

  const { postId, userId } = await request.body.json()

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        postOnUser: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.error(error)
  }
}
