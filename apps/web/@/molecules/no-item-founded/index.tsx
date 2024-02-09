import React from "react"

import { LucideDog } from "lucide-react"

import { cn } from "@/lib/utils"

import Typography from "../typography"

type NoItemFoundedProps = {
  className?: string
}

const NoItemFounded: React.FC<NoItemFoundedProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "mt-8 flex flex-col items-center justify-center rounded-md bg-white p-20",
        className
      )}
    >
      <LucideDog className="mx-auto mb-4 h-16 w-16" />
      <Typography>There are no items founded.</Typography>
    </div>
  )
}

export default NoItemFounded
