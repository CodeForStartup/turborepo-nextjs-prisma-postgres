import React from "react"

import { useTranslations } from "next-intl"

import { cn } from "../../lib/utils"
import Typography from "../typography"

type NoItemFoundedProps = {
  className?: string
}

const NoItemFounded: React.FC<NoItemFoundedProps> = ({ className = "" }) => {
  const t = useTranslations()

  return (
    <div className={cn("flex flex-col items-center justify-center rounded-md p-20", className)}>
      <div className="mx-auto mb-4 h-16 w-16 text-[40px]">
        <i className="ri-filter-off-line" />
      </div>

      <Typography>{t("common.no_items_founded")}</Typography>
    </div>
  )
}

export default NoItemFounded
