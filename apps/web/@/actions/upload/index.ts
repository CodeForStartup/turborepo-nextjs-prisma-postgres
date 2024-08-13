"use server"

import fs from "fs/promises"
import path from "path"

import prisma, { ActionReturnType } from "database"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"

import { getServerSession } from "@/utils/auth"

export async function handleUpload(file: File): Promise<
  ActionReturnType<{
    url: string
  }>
> {
  // Check if user is authenticated
  const session = await getServerSession()
  if (!session) {
    throw new Error("Unauthorized")
  }

  // Create folder name by date
  const folderName = new Date().toISOString().split("T")[0]
  const uploadDir = path.join(process.cwd(), "public", "images", folderName)

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
    { name: "medium", width: 640 },
    { name: "thumbnail", width: 320 },
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

  const fileRecord = await prisma.file.create({
    data: {
      name: fileName,
      path: urls[0],
      userId: session.user.id,
    },
  })

  return {
    data: {
      url: fileRecord?.path,
    },
  }
}
