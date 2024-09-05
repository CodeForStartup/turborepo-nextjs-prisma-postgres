import React from "react"
import Link from "next/link"

import { TTagItem } from "database"
import { Badge } from "ui"

import APP_ROUTES from "@/constants/routes"
import { generatePath } from "@/utils/generatePath"

interface TagBadgeProps {
  tag: {
    id: TTagItem["id"]
    name: TTagItem["name"]
    slug: TTagItem["slug"]
  }
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  return (
    <Link
      key={tag.id}
      href={generatePath(APP_ROUTES.TAG, {
        tagId: tag.slug || tag.id,
      })}
    >
      <Badge
        variant="outline"
        className="mr-2 rounded-sm hover:underline"
      >
        {tag.name}
      </Badge>
    </Link>
  )
}

export default TagBadge
