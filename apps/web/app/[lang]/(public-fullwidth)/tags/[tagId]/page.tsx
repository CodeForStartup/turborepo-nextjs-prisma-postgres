import { getPosts } from "database"

import { getTagById } from "@/actions/public/tags"
import { DEFAULT_PAGE_LIMIT } from "@/constants"
import NoItemFounded from "@/molecules/no-item-founded"
import TagPagination from "@/molecules/pagination"
import PostItem from "@/molecules/posts/post-item"
import TagDetail from "@/molecules/tag/tag-detail"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ searchParams, params }) {
  const posts = await getPosts({
    searchParams: {
      ...searchParams,
      tag: params.tagId,
    },
  })

  const tag = await getTagById(params.tagId)

  return (
    <div className="grid grid-cols-12 gap-10">
      <TagDetail tag={tag} />
      <div className="col-span-8 rounded-md">
        {posts?.data?.length > 0 ? (
          posts?.data?.map((post) => (
            <PostItem
              key={post?.id}
              post={post}
            />
          ))
        ) : (
          <NoItemFounded />
        )}
        {posts?.data && (
          <TagPagination
            baseUrl={`/tags/${params?.tagId}`}
            totalPages={Math.ceil(
              posts?.total / (Number(searchParams?.limit) || DEFAULT_PAGE_LIMIT)
            )}
          />
        )}
      </div>
    </div>
  )
}
