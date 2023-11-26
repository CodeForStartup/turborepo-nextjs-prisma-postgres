import { getPostById } from "@/actions/public/posts"
import PostDetail from "@/molecules/posts/post-detail"
import LikePost from "@/molecules/posts/post-item/like-button"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(params?.postId)

  return (
    <div className="flex gap-4">
      <div className="w-12">
        <div className="h-full w-12 rounded-full">
          <LikePost totalLikes={post?.postOnUser?.length} postId={params?.postId} />
        </div>
      </div>
      <PostDetail post={post} />
    </div>
  )
}
