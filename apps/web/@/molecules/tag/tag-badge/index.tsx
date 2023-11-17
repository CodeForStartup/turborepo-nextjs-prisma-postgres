import React from "react"
import Link from "next/link"

import { TTagItem } from "@/actions/public/tags"
import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  tag: {
    id: TTagItem["id"]
    name: TTagItem["name"]
    slug: TTagItem["slug"]
  }
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  return (
    <Link href={`/tags/${tag.id}`}>
      <Badge className="mr-2 rounded-sm bg-slate-200 text-gray-600 hover:bg-slate-300 hover:underline">
        {tag.name}
      </Badge>
    </Link>
  )
}

export default TagBadge
