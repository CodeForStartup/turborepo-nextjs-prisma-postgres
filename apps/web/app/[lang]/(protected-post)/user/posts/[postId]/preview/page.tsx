import { notFound } from "next/navigation"

import { useTranslations } from "next-intl"

import { getPost } from "@/actions/public/posts"

export default async function Page({ params }: { params: { postId: string } }) {
  // const t = useTranslations()
  const post = await getPost({ postIdOrSlug: params.postId })

  // if (!post) {
  //   return notFound()
  // }

  console.log(post)

  // Fetch the post content based on the lang and postId

  return <div>{JSON.stringify(post)}</div>
}
