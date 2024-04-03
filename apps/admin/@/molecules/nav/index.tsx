import Link from "next/link"

import { getTranslations } from "next-intl/server"

import { getServerSession } from "@/utils/auth"

import { UserNav } from "../user-nav"
import Logo from "./logo"
import ThemeToggle from "./theme-toggle"

export default async function Nav() {
  const session = await getServerSession()
  const t = await getTranslations()

  return (
    <header className="mx-auto h-[54px] items-center border-b p-2 sm:px-4 lg:px-4">
      <div className="flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-8">
          {session?.user ? (
            <div className="flex items-center gap-8">
              <UserNav />
            </div>
          ) : (
            <div className="flex w-20 items-center">
              <Link
                className="inline-flex h-10 w-20 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                href="/sign-in"
              >
                {t("common.signIn")}
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
