import React from "react"

import htmlReactParser, { attributesToProps, domToReact } from "html-react-parser"
import slugify from "slugify"

import { TPostItem } from "@/types/posts"

interface PostContentProps {
  post: TPostItem
}

const extractDataFromDomNode = (domNode) => {
  if (domNode.type === "text") {
    return domNode.data
  }

  return domNode.children
    .map((childNode) => {
      return extractDataFromDomNode(childNode)
    })
    .join("")
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "h1") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h1
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h1>
        )
      }
      if (domNode.name === "h2") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h2
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h2>
        )
      }
      if (domNode.name === "h3") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h3
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h3>
        )
      }
      if (domNode.name === "h4") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h4
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h4>
        )
      }
    },
  }

  return <div className="post-content mt-8">{htmlReactParser(post?.content, options)}</div>
}

export default PostContent
