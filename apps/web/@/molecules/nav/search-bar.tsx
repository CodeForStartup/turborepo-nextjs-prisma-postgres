"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { useTranslations } from "next-intl"
import { Button, cn, Input } from "ui"

export default function SearchBar() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const searchTermParams = searchParams?.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(searchTermParams)
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const onSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set("search", searchTerm)

    router.push("/search" + "?" + newSearchParams.toString())
  }

  const onClear = () => {
    setSearchTerm("")
    router.push("/")
  }

  useEffect(() => {
    setSearchTerm(searchTermParams)
  }, [searchTermParams])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === "Escape") {
        onClear()
        inputRef.current?.blur()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        className="w-full min-w-[400px]"
        placeholder={t("common.searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
      />
      {
        <div className="absolute right-1 top-1 flex h-8 items-center">
          {searchTerm && (
            <>
              <Button
                className="h-8 w-8 border-none hover:bg-transparent"
                variant="outline"
                onClick={onClear}
              >
                <i className="ri-close-line text-[20px]" />
              </Button>
              <Button
                variant="default"
                onClick={onSearch}
                className="mt-0 h-8 rounded-sm"
              >
                {t("common.search").toUpperCase()}
              </Button>
            </>
          )}
          {/* {!searchTerm && (
            <button
              onClick={() => {
                inputRef.current?.focus()
              }}
            >
              <kbd
                title={searchTerm ? t("common.searchShortcut") : undefined}
                className={cn(
                  "bg-dark-50 flex h-6 items-center gap-1 rounded-sm border p-2 text-gray-500 dark:border-gray-50"
                )}
              >
                {navigator?.userAgent?.toLowerCase()?.includes("mac") ? (
                  <>
                    <span className="text-xs">⌘</span>
                    <span className="text-xs">K</span>
                  </>
                ) : (
                  <>
                    <span>CRL K</span>
                  </>
                )}
                <span>CRL K</span>
              </kbd>
            </button>
          )} */}
        </div>
      }
    </div>
  )
}
