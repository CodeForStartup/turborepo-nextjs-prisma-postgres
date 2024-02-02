import querystring from "qs"

import { getUserById } from "@/actions/public/authors"
import { DEFAULT_PAGE_LIMIT } from "@/constants"
import UserProfile from "@/molecules/follower/user-profile"
import NoItemFounded from "@/molecules/no-item-founded"
import PostItem from "@/molecules/posts/post-item"
import TagPagination from "@/molecules/tag/pagination"
import { GetDataSuccessType } from "@/types"
import { TPostItem } from "@/types/posts"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ params, searchParams }) {
  const author = await getUserById(params?.authorId as string)

  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/public/posts?${querystring.stringify({
      authorId: params?.authorId,
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
  const postsJson: GetDataSuccessType<TPostItem[]> = await posts.json()

  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile author={author} />
      <div className="col-span-8 rounded-md">
        {postsJson?.data?.length > 0 ? (
          postsJson?.data?.map((post) => <PostItem key={post?.id} post={post} />)
        ) : (
          <NoItemFounded />
        )}
        {postsJson?.data && (
          <TagPagination
            baseUrl={`/author/${params?.authorId}`}
            totalPages={Math.ceil(
              postsJson?.total / (Number(searchParams?.limit) || DEFAULT_PAGE_LIMIT)
            )}
          />
        )}
      </div>
    </div>
  )
}
