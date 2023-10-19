import { getPostById } from "app/post-actions"
import PostDetail from "@/molecules/posts/post-detai"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(Number(params?.postId))

  return (
    <div>
      <PostDetail post={post} />
    </div>
  )
}
