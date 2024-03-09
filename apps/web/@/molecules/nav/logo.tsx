"use client"

import React from "react"
import Link from "next/link"

import { bebasNeue } from "@/font"
import { cn } from "@/lib/utils"

const Logo: React.FC = () => {
  return (
    <div className="mr-4 text-2xl font-bold">
      <Link href="/">
        <div className="flex items-center gap-1">
          <h1
            className={cn(
              "m-0 bg-gradient-to-r from-[tomato] to-[#ff0000] bg-clip-text text-[36px] font-bold tracking-wide text-transparent",
              bebasNeue.className
            )}
          >
            TOPLIST
          </h1>
        </div>
      </Link>
    </div>
  )
}

export default Logo
