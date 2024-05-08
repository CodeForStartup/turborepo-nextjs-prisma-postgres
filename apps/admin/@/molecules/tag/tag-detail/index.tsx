import Link from "next/link"

import { Tag } from "lucide-react"
import { Button, Card, CardContent, CardHeader } from "ui"

import { TTagItem } from "@/types/tags"

export type TagDetailProp = {
  tag: TTagItem
}

const TagDetail = ({ tag }: TagDetailProp) => {
  return (
    <div className="col-span-4">
      <Card>
        <CardHeader className="items-center justify-center">
          <div className="m-0 flex h-[80px] w-[80px] items-center justify-center rounded-[100%] border-dashed border-stone-900 bg-slate-200">
            <Tag size={32} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="flex-1 text-center text-4xl font-extrabold text-slate-700">
              <Link href={`/tags/${tag?.slug || tag?.id}`}>{tag.name}</Link>
            </h1>
            <div className="mt-4 flex w-full flex-1 divide-x">
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold text-slate-800">{tag?.tagOnPost?.length}</div>
                <div className="text-gray-400 hover:underline">
                  <Link href={`/tags/${tag.id}`}>posts</Link>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold text-slate-800">{tag?.tagOnPost?.length}</div>
                <div className="text-gray-400 hover:underline">
                  <Link href={`/tags/${tag.id}/follower`}>follower</Link>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 w-full"
              variant="outline"
            >
              Follow
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TagDetail
