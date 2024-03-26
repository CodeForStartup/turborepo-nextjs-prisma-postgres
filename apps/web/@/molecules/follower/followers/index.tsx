import React from "react"

import APP_APIS from "@/constants/apis"
import { generateApi } from "@/utils/generatePath"

import FollowerItem from "./follower-item"

export async function Followers({ authorId }: { authorId: string }) {
  const rawFollowers = await fetch(
    generateApi(
      APP_APIS.public.users.FOLLOWERS,
      { userIdOrSlug: authorId },
      {
        limit: 10,
        sort: "desc",
      }
    ),
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const followers = await rawFollowers?.json()

  return (
    <div className="col-span-8 flex flex-col gap-4">
      {followers?.map((follower) => (
        <FollowerItem
          key={follower?.id}
          user={follower}
        />
      ))}
    </div>
  )
}

export default Followers
