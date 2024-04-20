import { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
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
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <div>{title}</div>
      {column.getCanSort() && (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 gap-4 data-[state=open]:bg-accent"
          onClick={() => {
            column.toggleSorting()
          }}
        >
          {column.getIsSorted() === "desc" ? (
            <i className="ri-arrow-down-line" />
          ) : column.getIsSorted() === "asc" ? (
            <i className="ri-arrow-up-line" />
          ) : (
            <i className="ri-arrow-up-down-fill" />
          )}
        </Button>
      )}
    </div>
  )
}
