import { Metadata } from "next"

import APP_APIS from "@/constants/apis"
import PostDetail from "@/molecules/posts/post-detail"
import LikeButton from "@/molecules/posts/post-detail/like-button"
import BookmarkButton from "@/molecules/posts/post-item/bookmark-button"
import { generatePath } from "@/utils/generatePath"

export async function generateMetadata({ params }): Promise<Metadata> {
  const postRaw = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath(APP_APIS.public.post.GET, {
      postIdOrSlug: params?.postId,
    })}`
  )
  const post = await postRaw.json()

  return {
    title: post?.title,
    description: post?.description,
  }
}

export default async function Page({ params }: { params: { postId: string } }) {
  let post = null
  try {
    const postRaw = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath(APP_APIS.public.post.GET, {
        postIdOrSlug: params?.postId,
      })}`,
      {
        cache: "no-cache",
      }
    )

    post = await postRaw.json()
  } catch (error) {
    //
  }

  if (!post || post?.status === 404) {
    return <div>Post not found</div>
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9 flex gap-4">
        <div className="mt-8 flex w-12 flex-col gap-6">
          <LikeButton post={post} />
          <BookmarkButton post={post} showCount />
        </div>

        <PostDetail post={post} />
      </div>

      <div className="col-span-3">
        <div>Table of Contents</div>
      </div>
    </div>
  )
}
