import Link from "next/link"

import { getTranslations } from "next-intl/server"

import { getUserById } from "@/actions/public/authors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import FollowButton from "./FollowButton"

export type UserProfileProps = {
  authorId: string
}

export async function UserProfile({ authorId }: UserProfileProps) {
  const author = await getUserById(authorId)
  const t = await getTranslations()

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
                <div className="hover:underline">
                  <Link href={`/author/${author?.id}`}>{t("common.posts")}</Link>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="font-bold">{author?.post?.length}</div>
                <div className="hover:underline">
                  <Link href={`/author/${author?.id}/followers`}>{t("common.followers")}</Link>
                </div>
              </div>
            </div>
            <FollowButton authorId={author?.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfile
