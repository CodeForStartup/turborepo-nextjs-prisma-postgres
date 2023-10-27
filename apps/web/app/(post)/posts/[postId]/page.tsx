import { getPostById } from "app/post-actions"

import PostDetail from "@/molecules/posts/post-detail"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(Number(params?.postId))

  return (
    <div className="flex gap-4">
      <div className="w-20">
        <div className="h-20 w-20 rounded-full bg-neutral-100"></div>
      </div>
      <PostDetail post={post} />
    </div>
  )
}
