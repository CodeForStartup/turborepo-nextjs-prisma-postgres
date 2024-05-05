"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from "ui"

import { GetDataSuccessType } from "@/types"
import { TCommentItem } from "@/types/comment"
import { TPostItem } from "@/types/posts"

type CommentHeaderProps = {
  post: TPostItem
  comments: GetDataSuccessType<TCommentItem[]>
}

const CommentHeader: React.FC<CommentHeaderProps> = ({ comments }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onChangeSort = (value) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("sort", value)

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  const sortKey = searchParams.get("sort") || "top"

  return (
    <div className="flex items-center justify-between border-b px-8 py-4">
      <Typography
        variant="h4"
        id="comments"
        className="flex items-center gap-1"
      >
        {`${comments?.total} comments`}
      </Typography>
      <div className="flex gap-4 text-sm text-slate-500">
        <Typography className="flex items-center">Sort by</Typography>
        <Select
          value={sortKey}
          onValueChange={onChangeSort}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sorted by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default CommentHeader
