import Link from "next/link"
import { notFound } from "next/navigation"

import { getTag } from "database"
import { Tag } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Button, Card, CardContent, CardHeader, Typography } from "ui"

export default async function TagDetail({ tagIdOrSlug }: { tagIdOrSlug: string }) {
  const t = await getTranslations()

  const { data: tag, error } = await getTag({
    tagIdOrSlug,
  })

  if (error) {
    return notFound()
  }

  return (
    <div className="col-span-4">
      <Card>
        <CardHeader className="items-center justify-center">
          <div className="m-0 flex h-[80px] w-[80px] items-center justify-center rounded-[100%] border-dashed border-stone-900 bg-slate-200">
            <Tag size={32} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2">
            <Typography variant="h1">
              <Link href={`/tags/${tag?.slug || tag?.id}`}>{tag.name}</Link>
            </Typography>
            <div className="mt-4 flex w-full flex-1 divide-x">
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold text-slate-800">{tag?._count?.tagOnPost || 0}</div>
                <div className="text-gray-400 hover:underline">
                  <Link href={`/tags/${tag.id}`}>posts</Link>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold text-slate-800">0</div>
                <div className="text-gray-400 hover:underline">
                  <Link href={`/tags/${tag.id}/follower`}>follower</Link>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 w-full"
              variant="outline"
            >
              {t("common.follow")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
