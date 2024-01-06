"use client"

import React from "react"
import dayjs from "dayjs"
import { LucideHeart, LucideMoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import APP_ROUTES from "@/constants/routes"
import Typography from "@/molecules/typography"
import { TCommentItem } from "@/types/comment"
import { generatePath } from "@/utils/generatePath"

interface CommentItemProps {
  comment: TCommentItem
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="border-t p-8">
      <div className="flex items-center">
        <div>
          <Link
            href={generatePath(APP_ROUTES.USER, {
              userId: comment?.author?.id,
            })}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={comment?.author?.image || ""} alt={comment?.author?.name} />
              <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="ml-2 flex flex-1 justify-between">
          <div className="text-sm font-bold text-gray-500">{comment?.author?.name}</div>
          <time className="text-sm text-gray-400">
            {dayjs(comment?.updatedAt).format("MMMM D, YYYY")}
          </time>
        </div>
        <div>
          <Button variant="link" size="sm">
            <LucideMoreHorizontal size={20} className="text-gray-500" />
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <Typography>{comment?.content}</Typography>
      </div>

      <Button variant="link" size="sm" className="mt-2">
        <LucideHeart size={20} className="text-gray-500" />
        <span className="ml-1">100</span>
      </Button>
    </div>
  )
}

export default CommentItem
