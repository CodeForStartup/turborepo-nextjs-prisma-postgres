import React from "react"
import htmlReactParser, { attributesToProps, domToReact } from "html-react-parser"

import APP_ROUTES from "@/constants/routes"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

interface PostContentProps {
  post: TPostItem
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "h1") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h1 {...props}>
            <a
              href={generatePath(APP_ROUTES.POST, {
                postId: post?.slug || post?.id,
              })}
            >
              1
            </a>
            {domNode.children[0].data}
          </h1>
        )
      }
      if (domNode.name === "h2") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h2 {...props} id={domNode.children[0].data}>
            <a
              href={`${generatePath(APP_ROUTES.POST, {
                postId: post?.slug || post?.id,
              })}#${domNode.children[0].data}`}
            >
              {domNode.children[0].data}
            </a>
          </h2>
        )
      }
      if (domNode.name === "h3") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h3 {...props} id={domNode.children[0].data}>
            <a
              href={`${generatePath(APP_ROUTES.POST, {
                postId: post?.slug || post?.id,
              })}#${domNode.children[0].data}`}
            >
              {domNode.children[0].data}
            </a>
          </h3>
        )
      }
      if (domNode.name === "h4") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h4 {...props} id={domNode.children[0].data}>
            <a
              href={`${generatePath(APP_ROUTES.POST, {
                postId: post?.slug || post?.id,
              })}#${domNode.children[0].data}`}
            >
              {domToReact(domNode.children)}
            </a>
          </h4>
        )
      }
    },
  }

  return <div className="post-content mt-8">{htmlReactParser(post?.content, options)}</div>
}

export default PostContent
