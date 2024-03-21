import { Metadata } from "next"

import { getPosts } from "@/actions/public/posts"
import Filter from "@/molecules/home/filter"
import NoItemFounded from "@/molecules/no-item-founded"
import PostItem from "@/molecules/posts/post-item"

export const metadata: Metadata = {
  title: "Search",
  description: "Search",
}

export default async function Page({ searchParams }) {
  const posts = await getPosts({
    searchParams,
  })

  return (
    <div className="">
      <Filter />

      {posts?.data?.length === 0 ? (
        <NoItemFounded />
      ) : (
        <div className="mt-4">
          <div>
            <h1 className="flex-1 text-xl font-extrabold text-slate-700">
              Search results for:
              <span className="text-2xl text-slate-900">{searchParams?.search}</span> (
              {posts?.data?.length} founded)
            </h1>
          </div>
          <div className="mt-4">
            {posts?.data?.map((post) => (
              <PostItem
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
