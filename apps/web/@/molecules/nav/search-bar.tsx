"use client"

// import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"

import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations()

  return (
    <div className="w-[300px]">
      <Input
        className="w-[300px]"
        placeholder={t("common.search_placeholder")}
        defaultValue={searchParams.get("query")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            router.push(`/search?query=${e.currentTarget.value}`)
          }
        }}
      />
    </div>
  )
}
