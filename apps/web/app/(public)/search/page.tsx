import { Metadata } from "next"

import Filter from "@/molecules/home/filter"
import PostItem from "@/molecules/posts/post-item"

export const metadata: Metadata = {
  title: "Search",
  description: "Search",
}

export default async function Page({ searchParams }) {
  const posts = await fetch(
    `${process.env.FRONTEND_URL}/api/public/posts?query=${searchParams?.query}`,
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

      <div className="mt-4">{postsJson?.map((post) => <PostItem key={post.id} post={post} />)}</div>
    </div>
  )
}
