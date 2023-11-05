import { Suspense } from "react"
import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import PostForm from "../../create/post-form"
import { getPostById } from "../../post-actions"

export default async function Page({ params }: { params: { postId: string } }) {
  const session = await getServerSession(authConfigs)

  if (!session) {
    redirect("/signIn")
  }

  const post = await getPostById(params?.postId as string)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostForm title={post.title} content={post.content} />
    </Suspense>
  )
}
