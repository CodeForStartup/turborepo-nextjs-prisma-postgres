import { Tag } from "lucide-react"
import Link from "next/link"

import { getUserById } from "@/actions/public/authors"
import { Button } from "@/components/ui/button"
import PostItem from "@/molecules/posts/post-item"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ params }: { params: { authorId: string } }) {
  const author = await getUserById(params?.authorId as string)

  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-4">
        <div className="rounded-md bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="m-0 flex h-[80px] w-[80px] items-center justify-center rounded-[100%] border-dashed border-stone-900 bg-slate-200">
              <Tag size={32} />
            </div>
            <h1 className="flex-1 text-center text-4xl font-extrabold text-slate-700">
              <Link href={`${author.id}`}>{author.name}</Link>
            </h1>
            <div className="mt-4 flex w-full flex-1 divide-x">
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold text-slate-800">{author?.post?.length}</div>
                <div className="text-gray-400">posts</div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold text-slate-800">{author?.post?.length}</div>
                <div className="text-gray-400">followers</div>
              </div>
            </div>
            <Button className="mt-4 w-full" variant="outline">
              Follow
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-8 rounded-md">
        {author?.post?.map((post) => <PostItem key={post?.id} post={post} />)}
      </div>
    </div>
  )
}
