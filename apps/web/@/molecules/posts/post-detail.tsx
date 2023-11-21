import Link from "next/link"
import reactHtmlParser from "react-html-parser"

import { TPostItem } from "@/actions/public/posts"
import { Badge } from "@/components/ui/badge"
import PostMeta from "@/molecules/user/posts/post-meta"

export type PostDetailProps = {
  post: TPostItem
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="mb-8 w-full rounded bg-neutral-100 p-8">
      <h1 className="flex-1 text-4xl font-extrabold text-slate-700">
        <Link href={`${post.id}`}>{post.title}</Link>
      </h1>

      <PostMeta post={post} />

      <div className="mt-4">
        {post?.tagOnPost?.length > 0 &&
          post?.tagOnPost?.map((tag) => (
            <Link href={`/tags/${tag?.tag?.id}`} key={tag?.tag?.id}>
              <Badge className="mr-2 rounded-sm bg-slate-200 text-gray-600 hover:bg-slate-300">
                {tag?.tag?.name}
              </Badge>
            </Link>
          ))}
      </div>

      <div className="mt-8">{reactHtmlParser(post.content)}</div>
    </div>
  )
}
