"use client"

import { useTransition } from "react"
import { useParams } from "next/navigation"

import { locales } from "i18n"
import { useTranslations } from "next-intl"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "ui"

import { usePathname, useRouter } from "@/utils/navigation"

const LanguageSwitcher = () => {
  const router = useRouter()
  const params = useParams<{ lang: string }>()
  const { lang } = params
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()

  const handleLanguageChange = (selectedLocale) => {
    const pathnameParts = pathname.split("/")
    if (locales.includes(pathnameParts[1])) {
      pathnameParts[1] = selectedLocale
    } else {
      pathnameParts[0] = `/${selectedLocale}`
    }

    startTransition(() => {
      router.replace(pathname, { locale: selectedLocale })
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
          <SelectItem value="en">{t("common.english")}</SelectItem>
          <SelectItem value="fr">{t("common.french")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher
