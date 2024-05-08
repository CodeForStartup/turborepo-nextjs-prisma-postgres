import React from "react"
import Link from "next/link"

import { Table } from "@tanstack/react-table"
import { Plus, SlidersHorizontal } from "lucide-react"
import {
  Button,
  buttonVariants,
  cn,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui"

type AddTagProps<TData> = {
  table: Table<TData>
}

const AddTag = <TData,>({ table }: AddTagProps<TData>) => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden w-10 border p-0 uppercase lg:flex"
          >
            <SlidersHorizontal size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[150px]"
        >
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        href="/tags/add"
        className={cn(buttonVariants({ variant: "default", size: "sm" }), "border")}
      >
        <Plus size={16} /> Add tag
      </Link>
    </div>
  )
}

export default AddTag
