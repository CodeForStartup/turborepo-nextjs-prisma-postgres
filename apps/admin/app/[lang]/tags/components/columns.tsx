"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"



export interface TagItemProps {
  id: number,
  name: string,
  image: string,
  description: string,
  last_update: string,
  total_post: string,
  status: string,
  _count: {
    select: {
      tagOnPost: undefined,
    },
  },
}

export const columns: ColumnDef<TagItemProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={row?.original?.image || ""}
              alt={row.getValue("name")}
            />
            <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2">{row.getValue("name")}</div>
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
    accessorKey: "last_update",
    header: "Last update",
    cell: ({ row }) => {
      return <div className="">{row.getValue("last_update")}</div>
    },
  },
  {
    accessorKey: "total_post",
    header: "Total post",
    cell: ({ row }) => {
      return <div className="">{row.getValue("total_post")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.getValue("status") === 'active') {
        return <Badge>{row.getValue("status")}</Badge>

      }
      return <Badge variant={'secondary'}>{row.getValue("status")}</Badge>
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <div className="flex flex-row align-items">
        <button
          className={cn("p-1 rounded", {
            "bg-accent": true,
          })}
        >
          <Eye />
        </button>
        <button
          className={cn("p-1 rounded ml-4", {
            "bg-accent": true,
          })}
        >
          <Trash className="text-red-500" />
        </button>
      </div>
    },
  },
]