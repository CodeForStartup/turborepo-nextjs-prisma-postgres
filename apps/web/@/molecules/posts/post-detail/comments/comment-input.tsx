"use client"

import React, { useState } from "react"
import Link from "next/link"

import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  cn,
  Textarea,
  Typography,
} from "ui"

import APP_APIS from "@/constants/apis"
import APP_ROUTES from "@/constants/routes"
import { TCommentItem } from "@/types/comment"
import { generatePath } from "@/utils/generatePath"

interface CommentInputProps {
  postId: string
  onAddComment: (comment: TCommentItem) => void
}

const CommentInput: React.FC<CommentInputProps> = ({ postId, onAddComment }) => {
  const [text, setText] = useState("")
  const { data } = useSession()

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
  }

  const shouldDisableSubmit = text.length === 0 || text.length > 255

  const handleSubmit = async () => {
    if (shouldDisableSubmit) return

    try {
      const newComment = await fetch(APP_APIS.protected.comment.CREATE, {
        method: "POST",
        body: JSON.stringify({
          postId,
          comment: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const newCommentJson = await newComment.json()
      onAddComment(newCommentJson?.data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setText("")
    }
  }

  if (!data?.user?.id) {
    return (
      <div className="flex justify-center">
        <Link
          href={APP_ROUTES.LOGIN}
          className={cn(
            buttonVariants({
              variant: "default",
            })
          )}
        >
          Sign in to comment
        </Link>
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex items-center">
        <Link
          href={generatePath(APP_ROUTES.USER, {
            userId: data?.user?.id,
          })}
        >
          <div className="flex items-center">
            <div>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={data?.user?.image || ""}
                  alt={data?.user?.name}
                />
                <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2 text-sm font-bold text-gray-500">@{data?.user?.name}</div>
          </div>
        </Link>
      </div>
      <div className="mt-2">
        <Textarea
          value={text}
          onChange={handleTextChange}
          maxLength={255}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Typography
          variant="span"
          className="text-sm text-gray-500"
        >
          <strong>{text?.length || 0}</strong>/255
        </Typography>
        <Button
          onClick={handleSubmit}
          disabled={shouldDisableSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default CommentInput
