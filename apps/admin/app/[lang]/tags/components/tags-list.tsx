import React from "react"

import AddTag from "@/molecules/tag/add-tag"
import Filter from "@/molecules/tag/filter"
import { TTagListItem } from "@/types/tags"

import { columns } from "./columns"
import { DataTable } from "./data-table"

interface TagListProps {
  data: Array<TTagListItem>
  total: number
}

const TagList = ({ data, total }: TagListProps) => {
  return (
    <div className="w-full">
      <DataTable<TTagListItem, string>
        columns={columns}
        data={data}
        total={total}
      />
    </div>
  )
}

export default TagList
