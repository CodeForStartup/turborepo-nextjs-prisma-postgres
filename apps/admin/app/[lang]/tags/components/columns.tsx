"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"
import { Button, Checkbox } from "ui"

import { TTagListItem } from "@/types/tags"

import { DataTableColumnHeader } from "./column-header"

export const columns: ColumnDef<TTagListItem>[] = [
  {
    accessorKey: "id",
    enableHiding: false,
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
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Name"
        column={column}
      />
    ),
    cell: ({ row }) => {
      return <div className="">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Slug"
        column={column}
      />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Description"
        column={column}
      />
    ),
    cell: ({ row }) => {
      return <div className="">{row.getValue("description")}</div>
    },
  },
  {
    accessorKey: "_count",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Total post"
        column={column}
      />
    ),
    cell: ({ row }) => {
      return <div className="">{JSON.stringify(row.getValue("_count").tagOnPost)}</div>
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    enableHiding: false,
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
