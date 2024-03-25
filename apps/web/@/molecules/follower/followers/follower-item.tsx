import React from "react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TUserItem } from "@/types/users"

type FollowerItemProps = {
  follower: TUserItem
  className?: string
}

const FollowerItem: React.FC<FollowerItemProps> = ({
  follower,
  className = "",
}: FollowerItemProps) => {
  return (
    <div className={cn("flex rounded-md border p-8", className)}>
      <div className="flex-1">
        <Link href={`/author/${follower?.id}`}>
          <div className="flex flex-1 items-center gap-4">
            <div className="m-0 flex items-center justify-center rounded-[100%] border-dashed border-stone-900 bg-slate-200">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={follower?.image || ""}
                  alt={""}
                />
                <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">{follower.name}</div>
              <div className="text-gray-400">{follower.email}</div>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Button variant="outline">Follow</Button>
      </div>
    </div>
  )
}

export default FollowerItem
