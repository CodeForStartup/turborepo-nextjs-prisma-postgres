"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from "react-toastify"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import APP_APIS from "@/constants/apis"
import APP_ROUTES from "@/constants/routes"
import { cn } from "@/lib/utils"
import { TCommentItem } from "@/types/comment"

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
        <Link href={`/author/`}>
          <div className="flex items-center">
            <div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={data?.user?.image || ""} alt={data?.user?.name} />
                <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2 flex flex-col">
              <div className="text-sm font-bold text-gray-500">Luan Nguyen</div>
              <time className="text-sm text-gray-400"></time>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-2">
        <Textarea value={text} onChange={handleTextChange} maxLength={255} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p>{text?.length || 0}/255</p>
        <Button onClick={handleSubmit} disabled={shouldDisableSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default CommentInput
