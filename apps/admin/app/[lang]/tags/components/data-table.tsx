"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "ui"

import AddTag from "@/molecules/tag/add-tag"
import Filter from "@/molecules/tag/filter"
import { TTagListItem } from "@/types/tags"

import { DataTablePagination } from "./data-table-pagination"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
}

export function DataTable<TData, TValue>({ columns, data, total }: DataTableProps<TData, TValue>) {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = searchParams.get("page") ? Number(searchParams.get("page")) - 1 : 0
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 10
  const sortingParams = searchParams.get("sorting")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: limit,
  })

  const [sorting, setSorting] = useState<SortingState>()

  const onSetPagination = (pagination: PaginationState) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(pagination.pageIndex + 1))
    params.set("limit", pagination.pageSize.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    setSorting(sortingParams ? JSON.parse(sortingParams) : undefined)
  }, [sortingParams])

  const table = useReactTable<TData>({
    data,
    columns,
    pageCount: Math.ceil(total / limit),
    initialState: {
      pagination,
      sorting,
    },
    state: {
      pagination,
      sorting,
    },
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  })

  useEffect(() => {
    setPagination({
      pageIndex: page,
      pageSize: limit,
    })
  }, [page, limit])

  return (
    <div>
      <div className="align-items mt-4 flex flex-row justify-between pb-8">
        <Filter />
        <AddTag<TTagListItem> table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center"
                >
                  {t("common.no_items_founded")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination<TTagListItem>
        table={table}
        pagination={pagination}
        onSetPagination={onSetPagination}
      />
    </div>
  )
}
