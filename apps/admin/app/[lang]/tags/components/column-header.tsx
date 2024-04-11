import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <span>{title}</span>
      <div className="flex flex-col items-center">
        <ArrowUpIcon
          className={cn("h-3 w-3", column.isSortedDesc ? "text-gray-400" : "text-gray-600")}
        />
        <ArrowDownIcon
          className={cn("h-3 w-3", column.isSortedDesc ? "text-gray-600" : "text-gray-400")}
        />
      </div>
    </div>
  )
}
