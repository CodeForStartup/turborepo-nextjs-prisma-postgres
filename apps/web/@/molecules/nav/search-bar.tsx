"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const router = useRouter()
  const pathname = usePathname()

  const onSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set("search", searchTerm)

    router.push(pathname + "?" + newSearchParams.toString())
  }

  const onClear = () => {
    setSearchTerm("")

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete("search")
    router.push(pathname + "?" + newSearchParams.toString())
  }

  return (
    <div className="relative">
      <Input
        className="w-full min-w-[400px]"
        placeholder={t("common.searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
      />
      <div className="absolute right-0.5 top-0.5 flex h-9">
        <Button
          className="h-9 w-9 border-none hover:bg-transparent"
          variant="outline"
          onClick={onClear}
        >
          <i className="ri-close-line text-[20px]" />
        </Button>
        <Button
          variant="default"
          onClick={onSearch}
          className="mt-0 h-9 rounded-[4px]"
        >
          {t("common.search").toUpperCase()}
        </Button>
      </div>
    </div>
  )
}
