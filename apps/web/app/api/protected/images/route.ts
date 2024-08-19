import fs from "fs/promises"
import path from "path"
import { NextRequest } from "next/server"

import { createImage, getImage, getImages } from "database"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"

import { getServerSession } from "@/utils/auth"

// GET /api/protected/images/list
// GET /api/protected/images/list?page=1&limit=10
// GET /api/protected/images/list?page=1&limit=10&userId=1
// GET /api/protected/images/list?page=1&limit=10&userId=1&caption=test
// GET /api/protected/images/list?page=1&limit=10&userId=1&caption=test&mime=image/jpeg
// GET /api/protected/images/list?page=1&limit=10&userId=1&caption=test&mime=image/jpeg&sort=createdAt:desc
export async function GET(request: NextRequest, { params }: { params: { imageId: string } }) {
  try {
    const session = await getServerSession()

    if (!session) {
      return Response.json({
        status: 401,
        data: undefined,
        message: "Unauthorized",
      })
    }

    const images = await getImages({
      userId: session?.user?.id,
    })

    if (!images)
      return Response.json({
        status: 404,
        data: [],
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
      { name: "large", width: 1024, quality: 80 },
      { name: "medium", width: 640, height: 360, quality: 70 },
      { name: "thumbnail", width: 320, height: 180, quality: 60 },
    ]

    const urls = await Promise.all(
      sizes.map(async (size) => {
        let resizedImage = sharp(buffer).resize(size.width, size.height)
        const format = file.type.split("/")[1]

        switch (format) {
          case "jpeg":
          case "jpg":
            resizedImage = resizedImage.jpeg({ quality: size.quality })
            break
          case "png":
            resizedImage = resizedImage.png({ quality: size.quality })
            break
          case "webp":
            resizedImage = resizedImage.webp({ quality: size.quality })
            break
          // Add more cases for other formats if needed
        }

        const resizedBuffer = await resizedImage.toBuffer()

        const resizedFileName = `${size.name}-${fileName}`
        const filePath = path.join(uploadDir, resizedFileName)

        await fs.writeFile(filePath, resizedBuffer)

        return `/uploads/${folderName}/${resizedFileName}`
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
    // TODO: Log error
    // TODO: Return error message
    return Response.error()
  }
}
