/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { List, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
interface Filter {
  isTable: boolean
  setIsTable: (value: boolean) => void
}
const Filter = ({ isTable, setIsTable }: Filter) => {
  const searchParams = useSearchParams()

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")

  const onSearch = () => {
    router.push(`/tags?query=${searchTerm}`)
  }

  const onSetTable = (check) => {
    setIsTable(check)
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        placeholder="Filter tags..."
        value={searchTerm}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
        onChange={(e) => {
          setSearchTerm(e?.target?.value || "")
        }}
      />
      <Button
        className="ml-2"
        onClick={onSearch}
      >
        Filter
      </Button>
      <div className="flex flex-row items-center">
        <button
          onClick={() => onSetTable(true)}
          className={cn("p-2 rounded", {
            "bg-accent": isTable,
          },
          )}
        >
          <List />
        </button>
        <button
          onClick={() => onSetTable(false)}

          className={cn("p-2 rounded", {
            "bg-accent": !isTable,
          })}
        >
          <LayoutGrid />
        </button>

      </div>
    </div>
  )
}

export default Filter
