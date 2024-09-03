import { Metadata } from "next"

import { getPosts, PostStatus } from "database"

import useInfiniteScroll from "@/hooks/useInfinityScroll"
import Filter from "@/molecules/home/filter"
import PostList from "@/molecules/post-list"
import PostItem from "@/molecules/posts/post-item"

export const metadata: Metadata = {
  title: "Toplist360 - Share the best things",
  description: "Share the best things in the world",
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="">
      <Filter />

      <PostList />
    </div>
  )
}
