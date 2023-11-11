import { Suspense } from "react"
import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { getPostById } from "@/actions/protected/posts"
import PostForm from "@/molecules/post-form"

export default async function Page({ params }: { params: { postId: string } }) {
  const session = await getServerSession(authConfigs)

  if (!session) {
    redirect("/signIn")
  }

  const post = await getPostById(params?.postId as string)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostForm post={post} />
    </Suspense>
  )
}
