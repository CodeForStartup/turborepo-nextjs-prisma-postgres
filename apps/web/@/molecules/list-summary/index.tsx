import React from "react"

import { useTranslations } from "next-intl"
import { Typography } from "ui"

interface ListSummaryProps {
  total?: number
  subTotal?: number
}

const ListSummary: React.FC<ListSummaryProps> = ({ total = 0, subTotal = 0 }) => {
  const t = useTranslations()

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <Typography>{t("common.total_post_plural", { total, sub_total: subTotal })}</Typography>
      </div>
      <div></div>
    </div>
  )
}

export default ListSummary
