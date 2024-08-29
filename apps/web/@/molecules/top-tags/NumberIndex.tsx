"use client"

import React from "react"

import { cn } from "ui"

import { bebasNeue } from "@/font"

interface NumberIndexProps {
  number: number
}

const NumberIndex: React.FC<NumberIndexProps> = ({ number }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center fill-none stroke-black stroke-1 text-2xl font-extrabold",
        bebasNeue.className
      )}
    >
      {number}.
    </div>
  )
}

export default NumberIndex
