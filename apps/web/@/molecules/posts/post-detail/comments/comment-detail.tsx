"use client"

import React from "react"
import Link from "next/link"

import dayjs from "dayjs"
import { Avatar, AvatarFallback, AvatarImage, Button, Typography } from "ui"

import APP_ROUTES from "@/constants/routes"
import { TCommentItem } from "@/types/comment"
import { generatePath } from "@/utils/generatePath"

interface CommentItemProps {
  comment: TCommentItem
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="border-t px-8 py-4">
      <div className="flex items-center">
        <div>
          <Link
            href={generatePath(APP_ROUTES.USER, {
              userId: comment?.author?.id,
            })}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={comment?.author?.image || ""}
                alt={comment?.author?.name}
              />
              <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="ml-2 flex flex-1 justify-between">
          <Link
            href={generatePath(APP_ROUTES.USER, {
              userId: comment?.author?.id,
            })}
          >
            <div className="text-sm font-bold text-gray-500 hover:underline">
              @{comment?.author?.name}
            </div>
          </Link>
          <time className="text-sm text-gray-400">
            {dayjs(comment?.updatedAt).format("MMMM D, YYYY")}
          </time>
        </div>
        {/* <div>
          <Button
            variant="link"
            size="sm"
          >
            <LucideMoreHorizontal
              size={20}
              className="text-gray-500"
            />
          </Button>
        </div> */}
      </div>
      <div className="mt-4">
        <Typography>{comment?.content}</Typography>
      </div>

      {/* <Button
        variant="link"
        size="sm"
        className="mt-2"
      >
        <LucideHeart
          size={20}
          className="text-gray-500"
        />
        <span className="ml-1">100</span>
      </Button> */}
    </div>
  )
}

export default CommentItem
