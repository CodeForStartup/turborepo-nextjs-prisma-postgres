import Link from "next/link"

import querystring from "qs"
import { Card, CardContent, CardHeader, Typography } from "ui"

import { DEFAULT_TAG_PAGE_LIMIT } from "@/constants"
import APP_APIS from "@/constants/apis"
import NoItemFounded from "@/molecules/no-item-founded"
import PageTitle from "@/molecules/page-title"
import TagPagination from "@/molecules/pagination"
import Filter from "@/molecules/tag/filter"
import { GetDataSuccessType } from "@/types"
import { TTagItem } from "@/types/tags"

export const metadata = {
  title: "Tags",
  description:
    "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.",
}

export default async function Page({ searchParams }) {
  const tagsRaw = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${APP_APIS.public.tags.GET}?${querystring.stringify({
      query: searchParams?.query,
      limit: searchParams?.limit,
      page: searchParams?.page,
    })}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  )

  const tags: GetDataSuccessType<TTagItem[]> = await tagsRaw.json()

  return (
    <div className="">
      <PageTitle
        title="Tags"
        description="A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question."
      />

      <Filter />

      {tags?.data?.length === 0 ? (
        <NoItemFounded />
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tags?.data?.map((tag) => (
            <Link
              href={`/tags/${tag?.id}`}
              key={tag?.id}
            >
              <Card className="sm:col-span-1">
                <CardHeader>
                  <Typography
                    variant="h2"
                    className="text-xl hover:underline"
                  >
                    {tag?.name}
                  </Typography>
                </CardHeader>
                <CardContent>
                  {tag?.description && (
                    <Typography
                      variant="p"
                      className="text-gray-500"
                    >
                      {tag?.description}
                    </Typography>
                  )}
                  <Typography
                    variant="p"
                    className="text-gray-500"
                  >
                    {tag?._count?.tagOnPost} posts
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {tags && (
        <TagPagination
          baseUrl="/tags"
          totalPages={Math.ceil(
            tags?.total / (Number(searchParams?.limit) || DEFAULT_TAG_PAGE_LIMIT)
          )}
        />
      )}
    </div>
  )
}
