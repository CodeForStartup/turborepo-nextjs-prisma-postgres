import React from "react"

import { Rabbit } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn, Typography } from "ui"

type NoItemFoundedProps = {
  className?: string
}

const NoItemFounded: React.FC<NoItemFoundedProps> = ({ className = "" }) => {
  const t = useTranslations()

  return (
    <div className={cn("flex flex-col items-center justify-center rounded-md p-20", className)}>
      <div className="mx-auto mb-4 h-16 w-16 text-[40px]">
        <Rabbit className="h-full w-full" />
      </div>

      <Typography>{t("common.no_items_founded")}</Typography>
    </div>
  )
}

export default NoItemFounded
