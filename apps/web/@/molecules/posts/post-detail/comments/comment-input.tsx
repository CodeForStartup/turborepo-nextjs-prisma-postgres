"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CommentInputProps {}

const CommentInput: React.FC<CommentInputProps> = () => {
  const [text, setText] = useState("")
  const [charCount, setCharCount] = useState(0)

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
    setCharCount(newText.length)
  }

  const shouldDisableSubmit = text.length === 0 || text.length > 255

  const handleSubmit = () => {
    // Handle submit logic here
  }

  return (
    <div className="">
      <div className="flex items-center">
        <Link href={`/author/`}>
          <div className="flex items-center">
            <div>
              <Avatar className="h-9 w-9">
                <AvatarImage />
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
        <p>{charCount}/255</p>
        <Button onClick={handleSubmit} disabled={shouldDisableSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default CommentInput
