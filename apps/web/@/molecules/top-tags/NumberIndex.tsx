"use client"

import React from "react"

import { useTheme } from "next-themes"
import { cn } from "ui"

import { bebasNeue } from "@/font"

interface NumberIndexProps {
  number: number
}

const NumberIndex: React.FC<NumberIndexProps> = ({ number }) => {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        "flex items-center justify-center text-2xl font-extrabold text-transparent",
        bebasNeue.className
      )}
      style={{
        WebkitTextStroke: theme === "dark" ? "0.5px #000" : "0.5px #fff",
      }}
    >
      {number}.
    </div>
  )
}

export default NumberIndex
