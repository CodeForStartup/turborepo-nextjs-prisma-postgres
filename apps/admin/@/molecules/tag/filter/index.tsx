"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { useTranslations } from "next-intl"
import { Button, Input } from "ui"

import { usePathname } from "@/utils/navigation"

const Filter = () => {
  const searchParams = useSearchParams()
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")

  const onSearch = () => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("query", searchTerm)

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  return (
    <div className="flex w-full max-w-sm items-center gap-2 space-x-2">
      <Input
        placeholder={t("common.filter_by_placeholder")}
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
        className="border uppercase"
        onClick={onSearch}
      >
        {t("common.filter")}
      </Button>
    </div>
  )
}

export default Filter
