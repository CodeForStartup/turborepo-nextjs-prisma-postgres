"use client"

import React from "react"
import Link from "next/link"

import { cn } from "ui"

import { bebasNeue } from "@/font"

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <h1
        className={cn(
          "m-0 flex h-[30px] items-center bg-gradient-to-r from-[tomato] to-[#ff0000] bg-clip-text p-0 pt-[2px] text-[36px] font-bold tracking-wide text-transparent",
          bebasNeue.className
        )}
      >
        NEXT-FORUM
      </h1>
    </Link>
  )
}

export default Logo
