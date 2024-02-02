import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const locales = ["en-US", "nl-NL", "nl"]

function getLocale(req: NextRequest) {
  const languages = new Negotiator({ headers: req.headers }).languages()
  const defaultLocale = "en-US"

  match(languages, locales, defaultLocale) // -> 'en-US'
}

export async function middleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(req)
  req.nextUrl.pathname = `/${locale}${pathname}`

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

  return NextResponse.next(req)
}
