"use client"

import React from "react"
import dayjs from "dayjs"
import { LucideHeart, LucideMoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Typography from "@/molecules/typography"

interface CommentItemProps {
  comment?: string
  author?: string
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="border-t p-8">
      <div className="flex items-center">
        <div>
          <Link href={`/author/`}>
            <Avatar className="h-9 w-9">
              <AvatarImage />
              <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="ml-2 flex flex-1 justify-between">
          <div className="text-sm font-bold text-gray-500">Luan Nguyen</div>
          <time className="text-sm text-gray-400">{dayjs().format("MMMM D, YYYY")}</time>
        </div>
        <div>
          <Button variant="link" size="sm">
            <LucideMoreHorizontal size={20} className="text-gray-500" />
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <Typography>{comment}</Typography>
      </div>

      <Button variant="link" size="sm" className="mt-2">
        <LucideHeart size={20} className="text-gray-500" />
        <span className="ml-1">100</span>
      </Button>
    </div>
  )
}

export default CommentItem
