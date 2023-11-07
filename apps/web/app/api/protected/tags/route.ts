import prisma from "database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const search = newUrl.searchParams.get("search")
  try {
    const posts = await prisma.tags.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    })

    console.log(posts)

    return NextResponse.json(posts)
  } catch (error) {
    throw error
  }
}
