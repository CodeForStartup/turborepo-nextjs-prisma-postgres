import React from "react"
import Link from "next/link"

import { TPostItem } from "database"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "ui"

import APP_ROUTES from "@/constants/routes"
import { generatePath } from "@/utils/generatePath"

type CommentButtonProps = {
  post: TPostItem
}

const CommentButton: React.FC<CommentButtonProps> = ({ post }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`${generatePath(APP_ROUTES.POST, {
              postId: post?.id,
            })}#comments`}
            className="flex h-8 items-center justify-center rounded-md px-2 hover:bg-slate-300"
          >
            <i className="ri-message-2-line" />
            <div className="ml-1 flex items-center text-sm text-gray-600">
              {post?._count?.comments || 0}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>{`${post?._count?.comments || 0} comments`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CommentButton
