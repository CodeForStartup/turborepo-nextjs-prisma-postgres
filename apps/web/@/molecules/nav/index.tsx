import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { getServerSession } from "@/utils/auth"
import { UserNav } from "../user-nav"
import SearchBar from "./search-bar"

export default async function Nav() {
  const session = await getServerSession()

  return (
    <div className="mx-auto flex items-center border-b p-2 sm:px-6 lg:px-8">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 text-2xl font-bold">
            <Link href="/">
              <Image alt="codeforstartup.com" src="/assets/logo.png" width={40} height={40} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <SearchBar />
          {session?.user ? (
            <div className="flex gap-8">
              <Link href="/user/posts/create">
                <div className="flex items-center gap-1 pt-1 font-bold text-slate-500">
                  <Edit className="ml-2 inline-block" size={16} />
                  Write
                </div>
              </Link>
              <UserNav />
            </div>
          ) : (
            <div className="flex w-20 items-center">
              <Link
                className="inline-flex h-10 w-20 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                href="/signIn"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
