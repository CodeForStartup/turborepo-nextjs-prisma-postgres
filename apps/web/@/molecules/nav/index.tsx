"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { UserNav } from "../user-nav";
import Link from "next/link";

export default function Nav() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  return (
    <div className="flex justify-between container max-w-6xl mx-auto p-4 sm:px-6 items-center lg:px-8">
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
        <div className="flex items-center">
          <div className="mx-2">About</div>
          <div className="mx-2">Contact</div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
      ) : session ? (
        <UserNav />
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
  );
}
