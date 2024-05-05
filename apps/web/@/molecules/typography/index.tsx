import React from "react"

import { cn } from "../../lib/utils"

const variants: Record<string, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-bold tracking-tight",
  h4: "text-xl font-bold tracking-tight",
  p: "",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  span: "",
  pre: "",
  label: "",
  caption: "",
  time: "",
  a: "hover:underline",
}

type TypographyProps = {
  id?: string
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
    | "a"
  children: React.ReactNode
  className?: string
}

const Typography: React.FC<TypographyProps> = ({ id, variant = "p", className = "", children }) => {
  return React.createElement(
    variant,
    {
      id,
      className: cn(variants[variant] || "", className),
    },
    children
  )
}

export default Typography
