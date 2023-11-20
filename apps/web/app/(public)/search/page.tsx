import { Metadata } from "next"

import { getPosts } from "@/actions/public/posts"
import Filter from "@/molecules/home/filter"
import PostItem from "@/molecules/posts/post-item"

export const metadata: Metadata = {
  title: "Mooncake - Share you ideas with the world",
  description: "Share you ideas with the world",
}

export default async function Page({ params }: { params: { query: string } }) {
  const posts = await fetch(`/api/public/posts`).then((res) => res.json())

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
