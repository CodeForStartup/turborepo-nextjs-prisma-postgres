import fs from "fs/promises"
import path from "path"
import { NextRequest } from "next/server"

import { createImage, getImage } from "database"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"

import { getServerSession } from "@/utils/auth"

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
  const session = await getServerSession()

  if (!session?.user?.id) return Response.error()

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return Response.json({
        status: 400,
        data: undefined,
        message: "File not found",
      })
    }
    // Create folder name by date
    const folderName = new Date().toISOString().split("T")[0]
    const uploadDir = path.join(process.cwd(), "public", "uploads", folderName)

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true })

    // Generate unique filename
    const fileExtension = path.extname(file.name)
    const fileName = `${uuidv4()}${fileExtension}`

    // Read file buffer
    const buffer = await file.arrayBuffer()

    // Resize and save images
    const sizes = [
      { name: "large", width: 1024 },
      { name: "medium", width: 640, height: 360 },
      { name: "thumbnail", width: 320, height: 180 },
    ]

    const urls = await Promise.all(
      sizes.map(async (size) => {
        const resizedBuffer = await sharp(buffer).resize(size.width).toBuffer()

        const resizedFileName = `${size.name}-${fileName}`
        const filePath = path.join(uploadDir, resizedFileName)

        await fs.writeFile(filePath, resizedBuffer)

        return `/images/${folderName}/${resizedFileName}`
      })
    )

    const image = await createImage({
      path: urls[0],
      name: fileName,
      hash: file.name,
      ext: fileExtension,
      width: file.size,
      height: file.size,
      format: file.type,
      previewUrl: urls[0],
      caption: "",
      url: urls[0],
      mime: file.type,
      userId: session.user.id,
    })

    return Response.json({
      status: 200,
      data: image,
    })
  } catch (error) {
    console.log(">>>>>", error)

    // TODO: Log error
    // TODO: Return error message
    return Response.error()
  }
}
