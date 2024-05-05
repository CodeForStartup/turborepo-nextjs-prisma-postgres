"use client"

import React from "react"

import { useTheme } from "next-themes"

import { bebasNeue } from "@/font"

import { cn } from "../../lib/utils"

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
        WebkitTextStroke: theme === "light" ? "0.5px #000" : "0.5px #fff",
      }}
    >
      {number}.
    </div>
  )
}

export default NumberIndex
