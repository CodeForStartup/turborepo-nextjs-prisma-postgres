"use client"

import React, { useEffect } from "react"

import * as tocbot from "tocbot"

const TableOfContents: React.FC = () => {
  // Generate table of contents logic here
  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".tocbot",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".post-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3, h4, h5, h6",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      // positionFixedSelector: ".tocbot",
      includeHtml: true,
      // includeTitleTags: false,
      collapseDepth: 6,
      onClick: () => {
        // console.log("you clicked a link", e)
      },
      headingsOffset: 0,
      // scrollSmoothOffset: 0,
    })
  }, [])

  return <div className="tocbot toc sticky top-[56px]">{/* Render table of contents here */}</div>
}

export default TableOfContents
