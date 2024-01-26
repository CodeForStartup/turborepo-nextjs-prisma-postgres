"use client"

import React, { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { capitalizeFirstLetter } from "@/utils/capitalize"
import { FilteredValue, FilterItem, PeriodValues } from "./filter-item"

const Filter: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentFilterValue = searchParams.get("filter")
  const periodKey = searchParams.get("period")

  const [filterValue, setFilterValue] = useState<FilteredValue>(
    (currentFilterValue as FilteredValue) || FilteredValue.lasted
  )

  const onChangeFilter = (value: string) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("filter", value)
    urlSearchParam.delete("period")

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  const onChangePeriod = (value: string) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("period", value)
    urlSearchParam.set("filter", FilteredValue.hot)

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  return (
    <div className="flex h-10 items-center justify-between">
      <div className="flex gap-2">
        <FilterItem
          label="New"
          isActive={filterValue === "lasted"}
          onclick={() => {
            setFilterValue(FilteredValue.lasted)
            onChangeFilter("lasted")
          }}
        />
        <FilterItem
          label="Hot"
          isActive={filterValue === "hot"}
          onclick={() => {
            setFilterValue(FilteredValue.hot)
          }}
        />
      </div>
      {filterValue === FilteredValue.hot && (
        <div className="flex gap-1">
          {Object.values(PeriodValues).map((period) => (
            <FilterItem
              key={period}
              label={capitalizeFirstLetter(period)}
              isActive={periodKey === period}
              onclick={() => onChangePeriod(period)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter
