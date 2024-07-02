"use client"

import React from "react"

import { useTheme } from "next-themes"
import { cn } from "ui"

import { bebasNeue } from "@/font"

interface NumberIndexProps {
  number: number
}

const NumberIndex: React.FC<NumberIndexProps> = ({ number }) => {
  // const { theme } = useTheme()

  return (
    <div
      className={cn(
        "flex items-center justify-center stroke-black stroke-1 text-2xl font-extrabold"
      )}
    >
      {number}.
    </div>
  )
}

export default NumberIndex
