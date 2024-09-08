import { NextRequest, NextResponse } from "next/server"

import { auth } from "configs/auth"
import { locales } from "i18n"
import createIntlMiddleware from "next-intl/middleware"

const handleI18nRouting = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
})

export async function middleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname
  const session = await auth()

  if (!session?.user?.email && currentPathname.startsWith("/user")) {
    const newUrl = req.nextUrl.clone()
    const currentSearchParam = newUrl.searchParams.toString()
    newUrl.pathname = "/signin"
    newUrl.searchParams.set(
      "callbackUrl",
      encodeURIComponent(`${currentPathname}?${currentSearchParam}`)
    )

    return NextResponse.redirect(newUrl)
  }

  return handleI18nRouting(req)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // "/((?!_next).*)",
    // Optional: only run on root (/) URL
    "/((?!api/|_next/|_proxy/|asset|_static|_vercel|uploads|[\\w-]+\\.\\w+).*)",
  ],
}
