import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Column } from "@tanstack/react-table"
import { Button, cn } from "ui"

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onSort = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("sorting")
    if (column.getIsSorted() === "desc") {
      //
    } else if (column.getIsSorted() === "asc") {
      const newSort = [
        {
          id: column.id,
          desc: true,
        },
      ]

      params.append("sorting", JSON.stringify(newSort))
    } else {
      const newSort = [
        {
          id: column.id,
          desc: false,
        },
      ]

      params.append("sorting", JSON.stringify(newSort))
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <div>{title}</div>
      {column.getCanSort() && (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 gap-4 data-[state=open]:bg-accent"
          onClick={onSort}
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
