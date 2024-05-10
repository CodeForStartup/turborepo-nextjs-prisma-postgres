import type { PaginationState, Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ui"

type DataTablePaginationProps<TData> = {
  table: Table<TData>
  pagination: PaginationState
  onSetPagination: (pagination: PaginationState) => void
}

export function DataTablePagination<TData>({
  table,
  pagination,
  onSetPagination,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) is selected
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex flex-row items-center space-x-2">
          <Select
            value={`${pagination?.pageSize}`}
            onValueChange={(value) => {
              onSetPagination({
                ...pagination,
                pageSize: Number(value),
              })
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              onSetPagination({
                ...pagination,
                pageIndex: 0,
              })
            }}
            disabled={pagination.pageIndex < 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              onSetPagination({
                ...pagination,
                pageIndex: pagination.pageIndex - 1,
              })
            }}
            disabled={pagination.pageIndex < 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              onSetPagination({
                ...pagination,
                pageIndex: pagination.pageIndex + 1,
              })
            }}
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              onSetPagination({
                ...pagination,
                pageIndex: table.getPageCount() - 1,
              })
            }}
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
