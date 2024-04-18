"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { TTagListItem } from "@/types/tags"

export const columns: ColumnDef<TTagListItem>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return (
        <div className="">
          <code>/{row.getValue("slug")}</code>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="">{row.getValue("description")}</div>
    },
  },
  {
    accessorKey: "_count",
    header: "Total post",
    cell: ({ row }) => {
      return <div className="">{JSON.stringify(row.getValue("_count").tagOnPost)}</div>
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="align-items flex flex-row gap-2">
          <Button
            variant="ghost"
            size="sm"
          >
            <Eye size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
          >
            <Trash
              className="text-red-500"
              size={16}
            />
          </Button>
        </div>
      )
    },
  },
]
