// generate react component meta data for post with author, date, and tags
import dayjs from "dayjs"
import Link from "next/link"

import { TPostItem } from "@/actions/public/posts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type PostMetaProps = {
  post: TPostItem
}

export default function PostMeta({ post }: PostMetaProps) {
  return (
    <div className="mt-6 flex items-center">
      <Link href={`/author/${post.author.id}`}>
        <div className="flex items-center">
          <div>
            <Avatar className="h-9 w-9">
              <AvatarImage src={post?.author?.image || ""} alt={post?.author?.name} />
              <AvatarFallback>{(post?.author?.name || "CO").slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-2 flex flex-col">
            <div className="text-sm font-bold text-gray-500">{post.author.name}</div>
            <div className="text-sm text-gray-400">
              Last edit on {dayjs(post?.updatedAt).format("MMMM D, YYYY")}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
