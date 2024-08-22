"use client"

import { useTranslations } from "next-intl"
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ui"

import { useFileManager } from "./FileManagerContainer"

export default function ImageSearchBar() {
  const t = useTranslations()
  const { search, setSearch } = useFileManager()

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

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("common.sort_by")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Name A → Z</SelectItem>
          <SelectItem value="banana">Name Z → A</SelectItem>
          <SelectItem value="blueberry">Recent created</SelectItem>
          <SelectItem value="grapes">Last created</SelectItem>
        </SelectContent>
      </Select>

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
