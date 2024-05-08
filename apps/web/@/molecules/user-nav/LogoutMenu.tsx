"use client"

import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"
import { DropdownMenuItem, DropdownMenuShortcut } from "ui"

export const LogoutMenu = () => {
  const t = useTranslations()
  const onSignOut = () => {
    signOut({
      callbackUrl: "/",
    })
  }

  return (
    <DropdownMenuItem onClick={onSignOut}>
      {t("common.signOut")}
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
