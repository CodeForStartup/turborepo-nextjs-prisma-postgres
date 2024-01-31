import React from "react"
import querystring from "qs"

import APP_APIS from "@/constants/apis"
import Typography from "../typography"

const TopTag: React.FC = async () => {
  const rawTags = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${APP_APIS.public.tags.GET}?${querystring.stringify({
      limit: 10,
      sort: "desc",
    })}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const tagData = await rawTags.json()

  return (
    <div className="mt-4 border-t pt-4">
      <Typography variant="h3">Trending</Typography>
      <ol>
        {(tagData?.data || []).map((tag) => (
          <li key={tag.id}>
            {tag.name} ({tag._count.tagOnPost} posts)
          </li>
        ))}
      </ol>
    </div>
  )
}

export default TopTag
