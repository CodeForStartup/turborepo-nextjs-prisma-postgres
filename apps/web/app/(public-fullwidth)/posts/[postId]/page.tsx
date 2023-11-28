import { getPostById } from "@/actions/public/posts"
import PostDetail from "@/molecules/posts/post-detail"
import BookmarkButton from "@/molecules/posts/post-item/bookmark-button"
import LikePost from "@/molecules/posts/post-item/like-button"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(params?.postId)

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9 flex gap-4">
        <div className="w-12">
          <LikePost post={post} postDetailMode />
          <BookmarkButton post={post} />
        </div>

        <PostDetail post={post} />
      </div>

      <div className="col-span-3">
        <div>Table of Contents</div>
      </div>
    </div>
  )
}
