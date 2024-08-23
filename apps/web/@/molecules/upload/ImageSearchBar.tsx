"use client"

import { ArrowDownWideNarrow } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from "ui"

import { OrderByField } from "@/constants/upload"

import { useFileManager } from "./FileManagerContainer"

export default function ImageSearchBar() {
  const t = useTranslations()
  const { search, order, setSearch, setOrder } = useFileManager()

  const onClearSearch = () => {
    setSearch("")
  }

  return (
    <div className="flex gap-4 px-4 py-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-[300px]"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-1"
          >
            <ArrowDownWideNarrow size={16} />
            {t(`uploads.order_by.${order}`)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Order by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={order}
            onValueChange={setOrder}
          >
            {Object.values(OrderByField).map((order) => (
              <DropdownMenuRadioItem value={order}>
                {t(`uploads.order_by.${order}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {search && (
        <Button
          variant="link"
          onClick={onClearSearch}
        >
          {t("common.clear")}
        </Button>
      )}
    </div>
  )
}
