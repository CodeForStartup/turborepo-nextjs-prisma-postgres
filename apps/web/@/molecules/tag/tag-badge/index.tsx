import React from "react"
import Link from "next/link"

import { TTagItem } from "@/actions/public/tags"
import { Badge } from "@/components/ui/badge"
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
        tagId: tag.slug,
      })}
    >
      <Badge className="mr-2 rounded-sm text-gray-600 hover:underline">{tag.name}</Badge>
    </Link>
  )
}

export default TagBadge
