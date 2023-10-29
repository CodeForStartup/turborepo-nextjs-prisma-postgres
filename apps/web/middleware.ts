import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!session?.email && currentPathname.startsWith("/user")) {
    const newUrl = req.nextUrl.clone()
    const currentSearchParam = newUrl.searchParams.toString()
    newUrl.pathname = "/signIn"
    newUrl.searchParams.set(
      "callbackUrl",
      encodeURIComponent(`${currentPathname}?${currentSearchParam}`)
    )

    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}
