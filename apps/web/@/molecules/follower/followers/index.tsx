import React, { useEffect, useState } from "react"

import FollowerItem from "./follower-item"

export async function Followers({ authorId }: { authorId: string }) {
  return (
    <div className="col-span-8 flex flex-col gap-4">
      <FollowerItem />
      <FollowerItem />
      <FollowerItem />
      <FollowerItem />
    </div>
  )
}

export default Followers
