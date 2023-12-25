"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Filter = () => {
  const params = useSearchParams()

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(params.get("query") || "")

  return (
    <div className="mt-8 flex w-full max-w-sm items-center space-x-2">
      <Input
        placeholder="Filter tags..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e?.target?.value || "")
        }}
      />
      <Button
        className="ml-2"
        onClick={() => {
          router.push(`/tags?query=${searchTerm}`)
        }}
      >
        Filter
      </Button>
    </div>
  )
}

export default Filter
