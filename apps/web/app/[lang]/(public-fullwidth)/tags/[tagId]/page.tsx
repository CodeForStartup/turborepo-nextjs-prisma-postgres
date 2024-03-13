import querystring from "qs"

import { DEFAULT_PAGE_LIMIT } from "@/constants"
import NoItemFounded from "@/molecules/no-item-founded"
import TagPagination from "@/molecules/pagination"
import PostItem from "@/molecules/posts/post-item"
import TagDetail from "@/molecules/tag/tag-detail"
import { GetDataSuccessType } from "@/types"
import { TPostItem } from "@/types/posts"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ searchParams, params }) {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/public/posts?${querystring.stringify({
      tag: params?.tagId,
      limit: searchParams?.limit,
      page: searchParams?.page,
    })}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const tag = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/public/tag/${params.tagId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const postsJson: GetDataSuccessType<TPostItem[]> = await posts.json()
  const tagJson = await tag.json()

  return (
    <div className="grid grid-cols-12 gap-10">
      <TagDetail tag={tagJson} />
      <div className="col-span-8 rounded-md">
        {postsJson?.data?.length > 0 ? (
          postsJson?.data?.map((post) => (
            <PostItem
              key={post?.id}
              post={post}
            />
          ))
        ) : (
          <NoItemFounded />
        )}
        {postsJson?.data && (
          <TagPagination
            baseUrl={`/tags/${params?.tagId}`}
            totalPages={Math.ceil(
              postsJson?.total / (Number(searchParams?.limit) || DEFAULT_PAGE_LIMIT)
            )}
          />
        )}
      </div>
    </div>
  )
}
