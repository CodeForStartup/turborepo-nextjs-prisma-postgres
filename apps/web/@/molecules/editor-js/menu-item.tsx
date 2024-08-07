import React from "react"

import { cn } from "ui"

type MenuItemProps = {
  icon?: string
  title?: string
  isActive?: () => boolean
  action?: () => void
}

const MenuItem = ({ icon, title, action, isActive = null }: MenuItemProps) => (
  <button
    className={cn(
      "menu-item h-8 w-8 rounded border border-gray-500 text-gray-500 hover:bg-gray-900 hover:text-gray-100",
      {
        "is-active": isActive && isActive(),
      }
    )}
    onClick={action}
    title={title}
    type="button"
  >
    <i className={`ri-${icon}`}></i>
  </button>
)

export default MenuItem
