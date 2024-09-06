import React from "react"
import { Metadata } from "next/types"

import { auth } from "configs/auth"
import { getPosts } from "database"

import NoItemFounded from "@/molecules/no-item-founded"
import PageTitle from "@/molecules/page-title"
import Filter from "@/molecules/user/posts/filter"
import PostItem from "@/molecules/user/posts/post-item"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts",
    description: "User posts",
  }
}

export default async function Page({ searchParams }) {
  const session = await auth()
  const { total, data } = await getPosts({
    searchParams: {
      authorId: session?.user?.id,
      ...searchParams,
    },
  })

  return (
    <div>
      <PageTitle title="Posts" />

      <Filter total={total} />

      <div className="mt-12">
        {data?.data?.length === 0 ? (
          <NoItemFounded />
        ) : (
          data?.data?.map((post) => (
            <PostItem
              key={post.id}
              {...post}
            />
          ))
        )}
      </div>
    </div>
  )
}
