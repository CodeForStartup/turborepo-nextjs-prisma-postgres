import { Metadata } from "next"

import Filter from "@/molecules/home/filter"
import PostList from "@/molecules/post-list"

export const metadata: Metadata = {
  title: "Next-forum - Share the best things",
  description: "Share the best things in the world",
}

export default async function Page() {
  return (
    <div>
      <Filter />
      <PostList containerClassName="mt-4" />
    </div>
  )
}
