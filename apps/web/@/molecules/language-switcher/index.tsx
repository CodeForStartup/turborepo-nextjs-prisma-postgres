"use client"

import { useParams, useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LanguageSwitcher = () => {
  const router = useRouter()
  const params = useParams<{ lang: string }>()
  const { lang } = params

  const handleLanguageChange = (selectedLocale) => {
    router.replace(`/${selectedLocale}`)
  }

  return (
    <Select
      value={lang}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[100px] border-none">
        <SelectValue placeholder="Select a locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher
