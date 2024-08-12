import { NextRequest } from "next/server"

import { getImages } from "database"

export async function GET(request: NextRequest, { params }: { params: { imageId: string } }) {
  try {
    const images = await getImages()

    if (!images)
      return Response.json({
        status: 404,
        data: undefined,
        message: "Image not found",
      })

    return Response.json({
      status: 200,
      data: images,
    })
  } catch (error) {
    // TODO: Log error
    // TODO: Return error message
    return Response.error()
  }
}
