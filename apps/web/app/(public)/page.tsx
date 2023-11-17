import { Metadata } from "next"

import { getPosts } from "@/actions/public/posts"
import Filter from "@/molecules/home/filter"
import PostItem from "@/molecules/posts/post-item"

export const metadata: Metadata = {
  title: "Mooncake - Share you ideas with the world",
  description: "Share you ideas with the world",
}

export default async function Page() {
  const posts = await getPosts()

  return (
    <div className="">
      <Filter />
      <div className="mt-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
