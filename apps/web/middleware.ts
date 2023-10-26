import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const pathname = req.nextUrl.pathname

  if (!session?.email && pathname.startsWith("/user")) {
    const newUrl = req.nextUrl.clone()
    newUrl.pathname = "/signIn"
    newUrl.searchParams.set("callbackUrl", pathname)

    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}
