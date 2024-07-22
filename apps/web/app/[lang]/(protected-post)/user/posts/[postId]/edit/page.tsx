import { Metadata } from "next"

import { getPostById } from "@/actions/protect/posts"
import PostForm from "@/molecules/post-form"

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostById(params?.postId as string)

  return {
    title: post?.title,
    description: "", // post?.content.slice(0, 160),
  }
}

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(params?.postId as string)

  return <PostForm post={post} />
}
