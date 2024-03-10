import React from "react"

import Typography from "../typography"

interface ListSummaryProps {
  total: number
  currentTotal: number
}

const ListSummary: React.FC<ListSummaryProps> = ({ total, currentTotal }) => {
  return (
    <div className="flex items-center">
      <Typography>
        {currentTotal} post / {total} total post
      </Typography>
      <div></div>
    </div>
  )
}

export default ListSummary
