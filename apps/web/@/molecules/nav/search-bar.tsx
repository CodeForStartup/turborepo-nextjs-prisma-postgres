"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="w-[300px]">
      <Input
        className="w-[300px]"
        placeholder="Search..."
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
