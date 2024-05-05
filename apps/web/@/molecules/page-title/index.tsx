import React from "react"

import { Typography } from "ui"

export type PageTitleProps = {
  title: string
  description?: string
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Typography variant="h1">{title}</Typography>
      {description && <Typography className="text-muted-foreground">{description}</Typography>}
    </div>
  )
}
