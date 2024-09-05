import React from "react"

import { TTagItem } from "database"
import { cn } from "ui"

import TagBadge from "../tag-badge"

export type TagListProps = {
  tags: Pick<TTagItem, "id" | "name" | "slug">[]
  classes?: {
    container?: string
  }
}

export default function TagListMeta({
  tags,
  classes = {
    container: "",
  },
}: TagListProps) {
  return (
    <div className={cn(classes?.container)}>
      {tags?.length > 0 &&
        tags?.map((tag) => (
          <TagBadge
            key={tag?.id}
            tag={tag}
          />
        ))}
    </div>
  )
}
