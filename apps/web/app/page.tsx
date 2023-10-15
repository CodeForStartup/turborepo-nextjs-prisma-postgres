import PostItem from "@/molecules/posts/post-item";
import { getPosts } from "./post-actions";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="w-full flex flex-col">
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
