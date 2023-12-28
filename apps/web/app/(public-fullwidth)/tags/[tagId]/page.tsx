import PostItem from "@/molecules/posts/post-item"
import TagDetail from "@/molecules/tag/tag-detail"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ params }: { params: { tagId: string } }) {
  const posts = await fetch(`${process.env.FRONTEND_URL}/api/public/posts?tag=${params.tagId}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const tag = await fetch(`${process.env.FRONTEND_URL}/api/public/tag/${params.tagId}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const postsJson = await posts.json()
  const tagJson = await tag.json()

  return (
    <div className="grid grid-cols-12 gap-10">
      <TagDetail tag={tagJson} />
      {postsJson?.length > 0 && (
        <div className="col-span-8 rounded-md">
          {postsJson?.map((post) => <PostItem key={post?.post?.id} post={post} />)}
        </div>
      )}
    </div>
  )
}
