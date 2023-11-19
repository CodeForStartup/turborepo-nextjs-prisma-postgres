"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

enum FilteredValue {
  lasted = "lasted",
  hot = "hot",
}

const FilterItem = ({ label, param }: { label: string; param: string }) => {
  const searchParams = useSearchParams()

  const filteredValue = searchParams.get("filter") || FilteredValue.lasted
  const isFilterItemActive = filteredValue === param

  return (
    <div className="">
      <Link
        href={`/?filter=${param}`}
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
            className: cn("w-[80px] text-gray-500", {
              "font-bold text-gray-800": isFilterItemActive,
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filterValue = searchParams.get("filter") || FilteredValue.lasted
  const periodKey = searchParams.get("period") || "today"
  const shouldShowDateFilter = filterValue === FilteredValue.hot

  const onChangePeriod = (value: string) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("period", value)

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  return (
    <div className="flex h-10 items-center justify-between">
      <div className="flex gap-2">
        <FilterItem label="Lasted" param="lasted" />
        <FilterItem label="Hot" param="hot" />
      </div>
      {shouldShowDateFilter && (
        <div className="flex gap-2">
          <Select value={periodKey} onValueChange={onChangePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This week</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="this-year">This year</SelectItem>
                <SelectItem value="infinity">Infinity</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default Filter
