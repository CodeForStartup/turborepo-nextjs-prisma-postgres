import { getPostById } from "@/actions/public/posts"
import LikePost from "@/molecules/posts/like-post"
import PostDetail from "@/molecules/posts/post-detail"

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
