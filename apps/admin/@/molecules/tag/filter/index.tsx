/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { LayoutGrid, List } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Filter {
  isTable: boolean
  setIsTable: (value: boolean) => void
}
const Filter = ({ isTable, setIsTable }: Filter) => {
  const searchParams = useSearchParams()
  const t = useTranslations()

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")

  const onSearch = () => {
    router.push(`/tags?query=${searchTerm}`)
  }

  const onSetTable = (check) => {
    setIsTable(check)
  }

  return (
    <div className="flex w-full max-w-sm items-center gap-2 space-x-2">
      <Input
        placeholder={t("common.filter_tag")}
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
        className="uppercase"
        onClick={onSearch}
      >
        {t("common.filter")}
      </Button>
      {/* <div className="flex flex-row items-center gap-2">
        <Button
          onClick={() => onSetTable(true)}
          className={cn("rounded p-2", {
            "bg-accent": isTable,
          })}
        >
          <List />
        </Button>
        <Button
          onClick={() => onSetTable(false)}
          className={cn("rounded p-2", {
            "bg-accent": !isTable,
          })}
        >
          <LayoutGrid />
        </Button>
      </div> */}
    </div>
  )
}

export default Filter
