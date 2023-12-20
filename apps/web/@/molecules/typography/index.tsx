import React from "react"

const variants: Record<string, string> = {
  h1: "",
  h2: "",
  h3: "",
}

type TypographyProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "code"
    | "pre"
    | "blockquote"
    | "label"
    | "caption"
    | "time"
}

const Typography: React.FC<TypographyProps> = ({ variant }) => {
  return React.createElement(variant, {
    className: variants[variant],
  })
}

export default Typography
