import Link from "next/link"
import querystring from "qs"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import APP_APIS from "@/constants/apis"
import PageTitle from "@/molecules/page-title"
import Filter from "@/molecules/tag/filter"
import TagPagination from "@/molecules/tag/pagination"
import Typography from "@/molecules/typography"

export const metadata = {
  title: "Tags",
  description:
    "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.",
}

export default async function Page({ searchParams }) {
  const tagsRaw = await fetch(
    `${process.env.FRONTEND_URL}${APP_APIS.public.tags.GET}?${querystring.stringify({
      query: searchParams?.query,
      limit: searchParams?.limit,
      page: searchParams?.page,
    })}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  )

  // console.log(
  //   "path:",
  //   generatePath(`${process.env.FRONTEND_URL}${APP_APIS.public.tags.GET}`, {
  //     ...searchParams,
  //   })
  // )

  const tags = await tagsRaw.json()

  return (
    <div className="">
      <PageTitle
        title="Tags"
        description="A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question."
      />

      <Filter />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {tags?.map((tag) => (
          <Link href={`/tags/${tag?.id}`} key={tag?.id}>
            <Card className="sm:col-span-1">
              <CardHeader>
                <Typography variant="h2" className="text-xl hover:underline">
                  {tag?.name}
                </Typography>
              </CardHeader>
              <CardContent>
                {tag?.description && (
                  <Typography variant="p" className="text-gray-500">
                    {tag?.description}
                  </Typography>
                )}
                <Typography variant="p" className="text-gray-500">
                  {tag?._count?.tagOnPost} posts
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <TagPagination {...searchParams} />
    </div>
  )
}
