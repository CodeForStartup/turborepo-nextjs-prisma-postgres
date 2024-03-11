import React from "react"

import { useTranslations } from "next-intl"

import Typography from "../typography"

interface ListSummaryProps {
  total: number
}

const ListSummary: React.FC<ListSummaryProps> = ({ total }) => {
  const t = useTranslations()

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <Typography>{t("common.total_post_plural", { total })}</Typography>
      </div>
      <div></div>
    </div>
  )
}

export default ListSummary
