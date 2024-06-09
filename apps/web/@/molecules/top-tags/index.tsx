import React from "react"
import Link from "next/link"

import { getTopTags } from "database"
import { getTranslations } from "next-intl/server"
import { Typography } from "ui"

import NumberIndex from "./NumberIndex"

const TopTag: React.FC = async () => {
  const t = await getTranslations()

  const tagData = await getTopTags({})

  return (
    <div className="mt-4 border-t pt-4">
      <Typography variant="h3">{t("common.trending")}</Typography>
      <ul>
        {(tagData?.data || []).map((tag, index) => (
          <li
            key={tag.id}
            className="mb-2 flex items-center gap-2"
          >
            <NumberIndex number={index + 1} />
            <Link href={`/tags/${tag?.slug || tag?.id}`}>
              <div className="hover:underline">
                <strong>{tag.name}</strong>
                <Typography className="flex gap-1 text-xs">
                  <strong>{tag?._count.tagOnPost}</strong>
                  {t("common.post", {
                    total: tag?._count.tagOnPost || 0,
                  })}
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
