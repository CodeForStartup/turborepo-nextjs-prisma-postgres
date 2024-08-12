import { NextRequest } from "next/server"

import { createImage, getImage } from "database"

export async function GET(request: NextRequest, { params }: { params: { imageId: string } }) {
  try {
    const image = await getImage(params.imageId)

    if (!image)
      return Response.json({
        status: 404,
        data: undefined,
        message: "Image not found",
      })

    return Response.json({
      status: 200,
      data: image,
    })
  } catch (error) {
    // TODO: Log error
    // TODO: Return error message
    return Response.error()
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const image = await createImage(data)

    return Response.json({
      status: 200,
      data: image,
    })
  } catch (error) {
    // TODO: Log error
    // TODO: Return error message
    return Response.error()
  }
}
