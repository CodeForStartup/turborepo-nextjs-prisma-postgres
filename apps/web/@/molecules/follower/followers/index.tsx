import React from "react"

import querystring from "qs"

import APP_APIS from "@/constants/apis"
import { generatePath } from "@/utils/generatePath"

import FollowerItem from "./follower-item"

export async function Followers({ authorId }: { authorId: string }) {
  const rawFollowers = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath(APP_APIS.public.users.FOLLOWERS, {
      userIdOrSlug: authorId,
    })}?${querystring.stringify({
      limit: 10,
      sort: "desc",
    })}`,
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
      <div>{JSON.stringify(followers)}</div>
      {followers?.map((follower) => (
        <FollowerItem
          key={follower?.id}
          follower={follower}
        />
      ))}
    </div>
  )
}

export default Followers
