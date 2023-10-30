import { authConfigs } from "configs/auth"
import { Edit } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { UserNav } from "../user-nav"

export default async function Nav() {
  const session = await getServerSession(authConfigs)

  return (
    <div className="mx-auto flex items-center bg-neutral-100 p-2 sm:px-6 lg:px-8">
      <div className="container flex max-w-6xl items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 text-2xl font-bold">
            <Link href="/">
              <Image alt="codeforstartup.com" src="/assets/logo.png" width={40} height={40} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Input className="min-w-[200px]" />
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
            <div className="flex items-center">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
