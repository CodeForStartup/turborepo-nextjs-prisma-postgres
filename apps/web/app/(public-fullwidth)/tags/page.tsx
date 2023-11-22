import Link from "next/link"

import { getTags } from "@/actions/public/tags"
import { Badge } from "@/components/ui/badge"
import PageTitle from "@/molecules/page-title"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page() {
  const tags = await getTags()

  return (
    <div className="gap-10 rounded-md bg-white p-8">
      <PageTitle title="Tags" description="A list of tags used in the blog posts" />
      <div className="mt-8">
        {tags?.map((tag) => (
          <Link href={`/tags/${tag?.id}`} key={tag?.id}>
            <div>
              <Badge className="my-2 mr-4 rounded-sm bg-slate-200 text-gray-600 hover:bg-slate-300 hover:underline">
                <div>{tag?.name}</div>
                <div>[{tag?._count?.tagOnPost} articles]</div>
              </Badge>
              <div>{tag?.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
