"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useTranslations } from "next-intl"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ui"

import { ORDER_BY } from "@/constants/order"

interface FilterProps {
  total: number
}

const Filter: React.FC<FilterProps> = ({ total }) => {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const orderBy = searchParams.get("order_by") || ORDER_BY.updated_at_desc

  const onChangeFilter = (newValue) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("order_by", newValue)

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        {t("common.total_post_plural", {
          total,
        })}
      </div>
      <div>
        <Select onValueChange={onChangeFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder={t(`common.${orderBy}`)} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ORDER_BY).map((item) => (
              <SelectItem
                key={item}
                value={item}
              >
                {t(`common.${item}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Filter
