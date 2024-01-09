import React from "react"
import { LucideMessageSquare } from "lucide-react"
import Link from "next/link"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import APP_ROUTES from "@/constants/routes"
import { TPostItem } from "@/types/posts"
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
            <LucideMessageSquare className="h-4 w-4 text-gray-600" />
            <div className="ml-1 flex items-center text-sm text-gray-600">
              {post?._count?.Comment || 0}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>{`${post?._count?.Comment || 0} comments`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CommentButton
