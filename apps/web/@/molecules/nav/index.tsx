"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { UserNav } from "../user-nav";
import Link from "next/link";
import { Edit } from "lucide-react";

export default function Nav() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  return (
    <div className="flex mx-auto p-4 sm:px-6 items-center lg:px-8 border-b">
      <div className="container justify-between flex items-center max-w-6xl">
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-4">
            <a href="/">
              <Image
                alt="codeforstartup.com"
                src="/assets/logo.png"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        ) : session ? (
          <div className="flex gap-8">
            <Link href="/posts/create">
              <div className="flex gap-1 items-center font-bold text-slate-500 pt-1">
                <Edit className="inline-block ml-2" size={16} />
                Write
              </div>
            </Link>
            <UserNav />
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              href="/signIn"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
