import { Metadata } from "next"

import { getPosts } from "@/actions/public/posts"
import Filter from "@/molecules/home/filter"
import SearchBar from "@/molecules/nav/search-bar"
import NoItemFounded from "@/molecules/no-item-founded"
import PostItem from "@/molecules/posts/post-item"

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  return {
    title: `${searchParams?.search} - Search result`,
    description: `Search result for "${searchParams?.search}`,
  }
}

// TODO: Hight light matching
// TODO: Load more
export default async function Page({ searchParams }) {
  const posts = await getPosts({
    searchParams,
  })

  return (
    <div className="">
      <SearchBar />
      {posts?.data?.length === 0 ? (
        <NoItemFounded />
      ) : (
        <div className="mt-4">
          <div>
            <h1 className="flex-1 text-xl font-extrabold text-slate-700">
              {`${posts?.total} results for`}
              <span className="px-2 text-2xl text-slate-900">{`"${searchParams?.search}"`}</span>
            </h1>
          </div>

          <Filter />

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
