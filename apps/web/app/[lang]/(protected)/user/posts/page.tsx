import React from "react"
import { redirect } from "next/navigation"

import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth/next"

import { getPosts } from "@/actions/protected/posts"
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

  const posts = await getPosts()

  return (
    <div>
      <PageTitle
        title="Posts"
        description="Your posts"
      />

      <div className="mt-12">
        {posts.length === 0 ? (
          <div>You haven’t any post yet.</div>
        ) : (
          posts.map((post) => (
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
