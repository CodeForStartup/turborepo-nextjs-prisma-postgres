
"use client"

import React, { useState } from "react"
// import APP_APIS from "@/constants/apis"
import NoItemFounded from "@/molecules/no-item-founded"
import Filter from "@/molecules/tag/filter"
import AddTag from "@/molecules/tag/addTag"

import { DataTable } from "./data-table"
import { TagItemProps, columns } from "./columns"
import GridView from "./grid-view"
// import { GetDataSuccessType } from "@/types"


interface TagProps {
  tags: {
    data: TagItemProps[]
  }
}

const TaskList = ({ tags }: TagProps) => {
  const [isTable, setIsTable] = useState(true)

  return (
    <div className="w-full">
      <div className="flex flex-row align-items justify-between mt-4">
        <Filter isTable={isTable} setIsTable={setIsTable} />
        <AddTag />
      </div>
      {tags?.data?.length === 0 ? (
        <NoItemFounded />
      ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {!isTable && tags?.data?.map((tag) => (
                <GridView key={tag?.id} tag={tag} />

              ))}
            </div>
            <div>
              {isTable && tags?.data && (
                <DataTable columns={columns} data={tags?.data} />
              )}
            </div>
          </>
        )}
    </div>
  )
}

export default TaskList;
