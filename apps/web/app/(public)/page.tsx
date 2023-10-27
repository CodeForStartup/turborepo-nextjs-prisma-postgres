import PostItem from "@/molecules/posts/post-item"
import { getPosts } from "../post-actions"

export default async function Page() {
  const posts = await getPosts()

  return (
    <div className="">
      <div className="flex gap-2">
        <div className="rounded-sm bg-gray-100 px-2 py-1 text-sm uppercase text-slate-500">
          Newest
        </div>
        <div className="rounded-sm bg-gray-100 px-2 py-1 text-sm uppercase text-slate-500">Hot</div>
        <div className="rounded-sm bg-gray-100 px-2 py-1 text-sm uppercase text-slate-500">
          Trending
        </div>
      </div>
      <div className="mt-4">
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}
