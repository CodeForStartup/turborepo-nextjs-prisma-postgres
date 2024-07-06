import { getPosts } from "database"

import { DEFAULT_PAGE_LIMIT } from "@/constants"
import UserProfile from "@/molecules/follower/user-profile"
import ListSummary from "@/molecules/list-summary"
import NoItemFounded from "@/molecules/no-item-founded"
import TagPagination from "@/molecules/pagination"
import PostItem from "@/molecules/posts/post-item"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ params, searchParams }) {
  const { data, total } = await getPosts({
    searchParams: {
      authorId: params?.authorId,
      ...searchParams,
    },
  })

  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile authorId={params?.authorId} />
      <div className="col-span-8 rounded-md">
        <ListSummary total={total} />

        {data?.length > 0 ? (
          data?.map((post) => (
            <PostItem
              key={post?.id}
              post={post}
            />
          ))
        ) : (
          <NoItemFounded />
        )}
        {data && (
          <TagPagination
            baseUrl={`/author/${params?.authorId}`}
            totalPages={Math.ceil(total / (Number(searchParams?.limit) || DEFAULT_PAGE_LIMIT))}
          />
        )}
      </div>
    </div>
  )
}
