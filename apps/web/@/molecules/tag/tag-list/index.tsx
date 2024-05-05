import React from "react"

import { cn } from "../../lib/utils"
import TagBadge from "../tag-badge"

export type TagListProps = {
  tags: {
    tag: {
      id: string
      name: string
      slug: string
    }
  }[]
  classes?: {
    container?: string
  }
}

const TagList: React.FC<TagListProps> = ({
  tags,
  classes = {
    container: "",
  },
}) => {
  return (
    <div className={cn(classes?.container)}>
      {tags?.length > 0 &&
        tags?.map(({ tag }) => (
          <TagBadge
            key={tag?.id}
            tag={tag}
          />
        ))}
    </div>
  )
}

export default TagList
