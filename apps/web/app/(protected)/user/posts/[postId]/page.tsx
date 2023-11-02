import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import PostDetail from "@/molecules/user/posts/post-detail"
import { getPostById } from "../post-actions"

export default async function Page({ params }: { params: { postId: string } }) {
  const session = await getServerSession(authConfigs)

  if (!session) {
    redirect("/signIn")
  }

  const post = await getPostById(params?.postId)

  return (
    <div>
      <PostDetail post={post} />
    </div>
  )
}
