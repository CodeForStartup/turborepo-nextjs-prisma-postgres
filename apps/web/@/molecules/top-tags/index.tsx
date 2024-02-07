import React from "react"
import Link from "next/link"
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
      <ul>
        {(tagData?.data || []).map((tag, index) => (
          <li
            key={tag.id}
            className="mb-2 flex items-center gap-2"
          >
            <div className="flex items-center justify-center text-2xl font-extrabold text-gray-400">
              {index + 1}.
            </div>
            <Link href={`/tags/${tag?.slug || tag?.id}`}>
              <div className="hover:underline">
                <strong className="">{tag.name}</strong>
                <Typography className="flex text-xs">
                  <strong className="text-gray-500">{tag._count.tagOnPost}</strong>
                  <span className="ml-1 text-gray-400">post</span>
                </Typography>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopTag
