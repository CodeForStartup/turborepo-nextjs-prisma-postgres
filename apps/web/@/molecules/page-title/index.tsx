import React from "react"

export type PageTitleProps = {
  title: string
  description: string
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-700">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
