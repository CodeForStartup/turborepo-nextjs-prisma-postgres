"use client"

import { useTransition } from "react"
import { locales } from "i18n"
import { useParams, usePathname, useRouter } from "next/navigation"

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
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLanguageChange = (selectedLocale) => {
    const pathnameParts = pathname.split("/")
    if (locales.includes(pathnameParts[1])) {
      pathnameParts[1] = selectedLocale
    } else {
      pathnameParts[0] = `/${selectedLocale}`
    }
    console.log("====>", pathnameParts.join("/"))

    startTransition(() => {
      router.replace(`${pathnameParts.join("/")}`)
    })
  }

  return (
    <Select
      value={lang}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger
        className="w-[100px] border-none"
        disabled={isPending}
      >
        <SelectValue placeholder="Select a locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">Englishxxx</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher
