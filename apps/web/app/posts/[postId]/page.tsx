import { getPostById } from "../post-actions";
import PostDetail from "@/molecules/user/posts/post-detail";

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(Number(params?.postId));

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
