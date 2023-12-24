"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Filter = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="mt-4 flex max-w-[500px]">
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
