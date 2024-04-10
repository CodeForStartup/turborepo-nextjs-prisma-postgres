import React from "react"

import AddTag from "@/molecules/tag/addTag"
import Filter from "@/molecules/tag/filter"
import { TTagListItem } from "@/types/tags"

import { columns } from "./columns"
import { DataTable } from "./data-table"

interface TagListProps {
  tags: Array<TTagListItem>
  total: number
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="w-full">
      <div className="align-items mt-4 flex flex-row justify-between pb-8">
        <Filter />
        <AddTag />
      </div>
      <DataTable<TTagListItem, string>
        columns={columns}
        data={tags}
      />
    </div>
  )
}

export default TagList
