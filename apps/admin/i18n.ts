import { notFound } from "next/navigation"

import { getRequestConfig } from "next-intl/server"

// Can be imported from a shared config
export const locales = ["en", "fr"]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as unknown as string)) notFound()

  return {
    messages: (await import(`./@/messages/${locale}.json`)).default,
  }
})
