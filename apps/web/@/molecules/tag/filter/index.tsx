"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button, Input } from "ui"

const Filter = () => {
  const searchParams = useSearchParams()

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")

  const onSearch = () => {
    router.push(`/tags?query=${searchTerm}`)
  }

  return (
    <div className="mt-8 flex w-full max-w-sm items-center space-x-2">
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
    </div>
  )
}

export default Filter
