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
    <div className="flex gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-[300px]"
      />

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
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
