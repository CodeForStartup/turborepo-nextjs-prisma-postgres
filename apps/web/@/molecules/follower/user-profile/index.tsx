import Link from "next/link"

import { TUserItem } from "@/actions/public/authors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type UserProfile = {
  author: TUserItem
}

const UserProfile = ({ author }: UserProfile) => {
  return (
    <div className="col-span-4">
      <Card>
        <CardHeader className="items-center justify-center">
          <Link href={`/author/${author.id}`}>
            <div className="m-0 flex h-[80px] w-[80px] items-center justify-center rounded-[100%] border-dashed">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={author?.image || ""}
                  alt={author?.name}
                />
                <AvatarFallback>{(author?.name || "CO").slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="flex-1 text-center text-4xl font-extrabold">
              <Link href={`/author/${author.id}`}>{author.name}</Link>
            </h1>
            <div className="mt-4 flex w-full flex-1 divide-x">
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold">{author?.post?.length}</div>
                <div className="text-gray-400 hover:underline">
                  <Link href={`/author/${author?.id}`}>posts</Link>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold">{author?.post?.length}</div>
                <div className="hover:underline">
                  <Link href={`/author/${author?.id}/followers`}>followers</Link>
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

export default UserProfile
