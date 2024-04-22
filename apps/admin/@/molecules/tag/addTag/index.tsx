import React from "react"
import Link from "next/link"

import { Plus, SlidersHorizontal } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const AddTag = () => {
  return (
    <div className="flex gap-2">
      <Button
        className="w-10 border p-0 uppercase"
        variant="outline"
      >
        <SlidersHorizontal size="16" />
      </Button>

      <Link
        href="/tags/add"
        className={cn(buttonVariants({ variant: "default", size: "default" }), "border")}
      >
        <Plus size={16} /> Add tag
      </Link>
    </div>
  )
}

export default AddTag
