import { Prisma } from "database";
import PostForm from "../../create/post-form";
import { getPostById, updatePost } from "../../post-handlers";
import { Suspense } from "react";

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(Number(params?.postId));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostForm defaultValues={post} />
    </Suspense>
  );
}
