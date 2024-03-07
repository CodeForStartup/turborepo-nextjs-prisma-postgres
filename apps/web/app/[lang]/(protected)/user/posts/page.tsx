import React from "react"
import { redirect } from "next/navigation"

import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth/next"

import { getPosts } from "@/actions/public/posts"
import PageTitle from "@/molecules/page-title"
import PostItem from "@/molecules/user/posts/post-item"

export const metadata = {
  title: "Posts",
  description: "Your posts...",
}

export default async function Page() {
  const session = await getServerSession(authConfigs)

  if (!session) {
    redirect("/signIn")
  }

  const posts = await getPosts({
    searchParams: {
      authorId: session?.user?.id,
    },
  })

  return (
    <div>
      <PageTitle
        title="Posts"
        description="Your posts"
      />

      <div className="mt-12">
        {posts?.data?.length === 0 ? (
          <div>You haven’t any post yet.</div>
        ) : (
          posts?.data?.map((post) => (
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
