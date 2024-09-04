import { Suspense } from "react"
import { Metadata } from "next"

import { PostStatus } from "database"
import { PostSkeleton } from "ui"

import Filter from "@/molecules/home/filter"
import PostList from "@/molecules/posts/post-list"

export const metadata: Metadata = {
  title: "Next-forum - Share the best things",
  description: "Share the best things in the world",
}

export default async function Page() {
  return (
    <div>
      <Filter />
      <Suspense fallback={<PostSkeleton total={10} />}>
        <PostList
          getPostParams={{
            postStatus: PostStatus.PUBLISHED,
          }}
        />
      </Suspense>
    </div>
  )
}
