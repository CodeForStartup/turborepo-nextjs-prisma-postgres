import { Metadata } from "next"

import Filter from "@/molecules/home/filter"
import NoItemFounded from "@/molecules/no-item-founded"
import PostItem from "@/molecules/posts/post-item"

export const metadata: Metadata = {
  title: "Search",
  description: "Search",
}

export default async function Page({ searchParams }) {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/public/posts?query=${searchParams?.query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const postsJson = await posts.json()

  return (
    <div className="">
      <Filter />

      {postsJson?.length === 0 ? (
        <NoItemFounded />
      ) : (
        <div className="mt-4">
          <div>
            <h1 className="flex-1 text-xl font-extrabold text-slate-700">
              Search results for:{" "}
              <span className="text-2xl text-slate-900">{searchParams?.query}</span> (
              {postsJson.length} founded)
            </h1>
          </div>
          <div className="mt-4">
            {postsJson?.map((post) => <PostItem key={post.id} post={post} />)}
          </div>
        </div>
      )}
    </div>
  )
}
