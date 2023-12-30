import { Metadata } from "next"

import Filter from "@/molecules/home/filter"
import PostItem from "@/molecules/posts/post-item"
import { GetDataSuccessType } from "@/types"
import { TPostItem } from "@/types/posts"

export const metadata: Metadata = {
  title: "Toplist360 - Share the best things",
  description: "Top of the best things in the world",
}

export default async function Page() {
  const posts = await fetch(`${process.env.FRONTEND_URL}/api/public/posts`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const postsJson: GetDataSuccessType<TPostItem[]> = await posts.json()

  return (
    <div className="">
      <Filter />
      <div className="mt-4">
        {postsJson?.data?.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  )
}
