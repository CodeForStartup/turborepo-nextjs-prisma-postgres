import React, { useMemo } from "react"

import edjsHTML from "editorjs-html"
import htmlReactParser, { attributesToProps, domToReact } from "html-react-parser"
import DOMPurify from "isomorphic-dompurify"
import slugify from "slugify"

import { TPostItem } from "@/types/posts"

const edjsParser = edjsHTML()

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

const HTMLParser: React.FC<PostContentProps> = ({ post }) => {
  const html = post.content
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

  return <div className="post-content mt-8">{htmlReactParser(html, options)}</div>
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const contentHtml = useMemo(() => {
    if (!post.content) return ""

    console.log(">>>>>>", post.content)

    try {
      const content = JSON.parse(post.content)
      const htmlArray = edjsParser.parse(content)
      console.log(">>>>>>", htmlArray)
      const html = htmlArray.join("")
      return DOMPurify.sanitize(html)
    } catch (error) {
      console.log(">>>>>>", error)

      return ""
    }
  }, [post.content])

  return (
    <div
      className="post-content mt-8"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}

export default PostContent
