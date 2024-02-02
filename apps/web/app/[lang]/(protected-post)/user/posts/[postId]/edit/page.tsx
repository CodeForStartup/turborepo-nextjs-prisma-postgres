import { getPostById } from "@/actions/protected/posts"
import PostForm from "@/molecules/post-form"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(params?.postId as string)

  return <PostForm post={post} />
}
