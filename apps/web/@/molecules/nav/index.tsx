import Link from "next/link"

import { auth } from "configs/auth"
import { Edit } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { buttonVariants, cn } from "ui"

import { UserNav } from "../user-nav"
import Logo from "./logo"
import SearchBar from "./search-bar"
import ThemeToggle from "./theme-toggle"

export default async function Nav() {
  const session = await auth()
  const t = await getTranslations()

  return (
    <header className="mx-auto flex items-center border-b p-2 sm:px-6 lg:px-8">
      <div className="container flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-8">
          <SearchBar />
          {session?.user ? (
            <div className="flex items-center gap-8">
              <Link href="/user/posts/create">
                <div
                  className={cn(
                    buttonVariants({
                      variant: "default",
                    })
                  )}
                >
                  <Edit
                    className="mr-2 inline-block"
                    size={16}
                  />
                  {t("common.write")}
                </div>
              </Link>
              <UserNav />
            </div>
          ) : (
            <div className="flex w-20 items-center">
              <Link
                className="inline-flex h-10 w-20 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                href="/signin"
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
