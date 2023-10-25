"use client"

import { signOut } from "next-auth/react"

import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"

export const LogoutMenu = () => {
  const onSignOut = () => {
    signOut({
      callbackUrl: "/",
    })
  }

  return (
    <DropdownMenuItem onClick={onSignOut}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
