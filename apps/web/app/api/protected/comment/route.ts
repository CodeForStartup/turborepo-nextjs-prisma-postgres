import prisma from "database"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"
import { z } from "zod"

import APP_APIS from "@/constants/apis"
import { getServerSession } from "@/utils/auth"
import { generatePath } from "@/utils/generatePath"

export async function POST(request: NextRequest) {
  console.log("------------------>>>")
  console.log(JSON.stringify(request.headers.keys()))
  console.log(JSON.stringify(request.headers.get("authorization")))

  return Response.json({ message: "Hello World" })
}
