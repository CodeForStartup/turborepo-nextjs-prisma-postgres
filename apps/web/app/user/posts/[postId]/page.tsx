import { getPostById } from "../post-handlers";
import PostDetail from "@/molecules/post/post-detail";

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(Number(params?.postId));
  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
