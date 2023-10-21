import React from "react"

type MenuItemProps = {
  icon?: string
  title?: string
  isActive?: () => boolean
  action?: () => void
}

export default ({ icon, title, action, isActive = null }: MenuItemProps) => (
  <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
  >
    <i className={`ri-${icon}`}></i>
  </button>
)
