import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

import APP_ROUTES from "@/constants/routes"

const locales = ["en", "ja", "vi", "zh", "fr"]
const defaultLocale = "en"

function getLocale(req: NextRequest) {
  const languages = new Negotiator({
    headers: {
      "accept-language": req.headers.get("accept-language"),
    },
  }).languages()

  return match(languages, locales, defaultLocale) || defaultLocale
}

export async function middleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let locale = defaultLocale
  if (!pathnameHasLocale) {
    locale = getLocale(req)
    req.nextUrl.pathname = `/${locale}${pathname}`
  }

  if (!session?.email && currentPathname.startsWith("/user")) {
    const newUrl = req.nextUrl.clone()
    const currentSearchParam = newUrl.searchParams.toString()
    newUrl.pathname = APP_ROUTES.LOGIN
    newUrl.searchParams.set(
      "callbackUrl",
      encodeURIComponent(`${currentPathname}?${currentSearchParam}`)
    )

    return NextResponse.rewrite(newUrl.toString())
  }

  return NextResponse.rewrite(req.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // "/((?!_next).*)",
    // Optional: only run on root (/) URL
    "/((?!api/|_next/|_proxy/|asset|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}
