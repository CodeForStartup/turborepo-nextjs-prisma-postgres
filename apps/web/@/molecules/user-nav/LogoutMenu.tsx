"use client"

import { useTranslations } from "next-intl"
import { DropdownMenuItem, DropdownMenuShortcut } from "ui"

import { onSignOut } from "@/actions/auth"

export const LogoutMenu = () => {
  const t = useTranslations()

  return (
    <form action={onSignOut}>
      <button
        type="submit"
        className="w-full"
      >
        <DropdownMenuItem className="hover:cursor-pointer">
          {t("common.signOut")}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </button>
    </form>
  )
}
