import Link from "next/link"

import { TTagItem } from "database"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, Typography } from "ui"

export default function TagItem({ tag }: { tag: TTagItem }) {
  const t = useTranslations("common")

  return (
    <Link
      href={`/tags/${tag?.id}`}
      key={tag?.id}
    >
      <Card className="px-6 py-4 sm:col-span-1">
        <CardHeader className="flex-row justify-between overflow-hidden p-0">
          <Typography
            variant="h3"
            className="mb-1 break-words text-lg hover:underline"
          >
            #{tag?.name}
          </Typography>
        </CardHeader>
        <CardContent className="p-0">
          {tag?.description && <Typography variant="span">{tag?.description}</Typography>}
          <div>
            <Typography
              variant="span"
              className="font-semibold"
            >
              {t("post_plural", { total: tag?._count?.tagOnPost || 0 })}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
