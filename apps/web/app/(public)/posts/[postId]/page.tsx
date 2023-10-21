import PostDetail from "@/molecules/posts/post-detai"
import { getPostById } from "app/post-actions"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(Number(params?.postId))

  return (
    <div>
      <PostDetail post={post} />
    </div>
  )
}
