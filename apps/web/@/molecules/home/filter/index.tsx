"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const FilterItem = ({ label, param }: { label: string; param: string }) => {
  const searchParams = useSearchParams()

  const filterKey = searchParams.get("filter")

  return (
    <div className="">
      <Link
        href={`/?filter=${param}`}
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
            className: cn("w-[80px] text-gray-500", {
              "font-bold text-gray-800": filterKey === param,
            }),
          })
        )}
      >
        <div>{label}</div>
      </Link>
    </div>
  )
}

const Filter: React.FC = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <FilterItem label="Lasted" param="lasted" />
        <FilterItem label="Hot" param="hot" />
      </div>
      <div className="flex gap-2"></div>
    </div>
  )
}

export default Filter
