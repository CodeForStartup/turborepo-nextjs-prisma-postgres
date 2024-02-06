"use client"

import { useParams, useRouter } from "next/navigation"

const LanguageSwitcher = () => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

  const handleLanguageChange = (e) => {
    const selectedLocale = e.target.value
    router.push(`/${selectedLocale}`)
  }

  return (
    <select
      value={locale || "en"}
      onChange={handleLanguageChange}
    >
      <option value="en">English</option>
      <option value="fr">French</option>
    </select>
  )
}

export default LanguageSwitcher
