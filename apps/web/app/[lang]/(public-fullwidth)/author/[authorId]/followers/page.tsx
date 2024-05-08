import { Metadata } from "next"

import APP_APIS from "@/constants/apis"
import Followers from "@/molecules/follower/followers"
import UserProfile from "@/molecules/follower/user-profile"
import { TUserItem } from "@/types/users"
import { generatePath } from "@/utils/generatePath"

export async function generateMetadata({
  params,
}: {
  params: { authorId: string }
}): Promise<Metadata> {
  const rawAuthor = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath(APP_APIS.protected.user.GET, {
      userId: params?.authorId,
    })}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const author: TUserItem = await rawAuthor?.json()

  return {
    title: `${author.name} - Followers`,
    description: author.bio,
  }
}

export default async function Page({ params }: { params: { authorId: string } }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile authorId={params?.authorId} />

      <Followers authorId={params?.authorId} />
    </div>
  )
}
