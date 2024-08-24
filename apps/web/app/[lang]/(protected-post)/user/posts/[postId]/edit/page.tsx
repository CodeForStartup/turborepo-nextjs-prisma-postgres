import { Metadata } from "next"

import { getPost } from "database"

import PostForm from "@/molecules/post-form"

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost({ postIdOrSlug: params?.postId as string })

  return {
    title: post?.data?.title,
    description: "", // post?.content.slice(0, 160),
  }
}

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPost({ postIdOrSlug: params?.postId as string })

  return <PostForm post={post?.data} />
}
