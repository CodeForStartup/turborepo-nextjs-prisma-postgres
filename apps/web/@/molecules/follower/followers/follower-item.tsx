import React from "react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage, Button, cn } from "ui"

import { TUserItem } from "@/types/users"

type FollowerItemProps = {
  user: TUserItem
  className?: string
  showFollowButton?: boolean
}

const FollowerItem: React.FC<FollowerItemProps> = ({
  user,
  className = "",
  showFollowButton = true,
}: FollowerItemProps) => {
  return (
    <div className={cn("flex rounded-md border p-8", className)}>
      <div className="flex-1">
        <Link href={`/author/${user?.id}`}>
          <div className="flex flex-1 items-center gap-4">
            <div className="m-0 flex items-center justify-center rounded-[100%] border-dashed border-stone-900 bg-slate-200">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={user?.image || ""}
                  alt={""}
                />
                <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">{user.name}</div>
              <div className="text-gray-400">{user.email}</div>
            </div>
          </div>
        </Link>
      </div>
      {showFollowButton && <Button variant="outline">Follow</Button>}
    </div>
  )
}

export default FollowerItem
