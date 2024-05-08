import React from "react"

type MenuItemProps = {
  icon?: string
  title?: string
  isActive?: () => boolean
  action?: () => void
}

const MenuItem = ({ icon, title, action, isActive = null }: MenuItemProps) => (
  <button
    className={`menu-item border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-gray-100 ${
      isActive && isActive() ? "is-active" : ""
    }`}
    onClick={action}
    title={title}
    type="button"
  >
    <i className={`ri-${icon}`}></i>
  </button>
)

export default MenuItem
