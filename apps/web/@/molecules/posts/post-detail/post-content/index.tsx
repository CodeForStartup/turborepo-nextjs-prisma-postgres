import React from "react"

import reactHtmlParser from "react-html-parser"

import { TPostItem } from "@/types/posts"

interface PostContentProps {
  post: TPostItem
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return <div className="mt-8">{reactHtmlParser(post?.content)}</div>
}

export default PostContent
