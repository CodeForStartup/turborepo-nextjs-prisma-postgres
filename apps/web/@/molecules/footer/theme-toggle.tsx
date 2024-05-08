"use client"

import React from "react"

import { useTheme } from "next-themes"
import { Button } from "ui"

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={toggleTheme}
        variant="link"
        className="hover:no-underline"
      >
        <i className="ri-mac-line" />
      </Button>
      <Button
        onClick={toggleTheme}
        variant="link"
        className="hover:no-underline"
      >
        <i className="ri-sun-line" />
      </Button>
      <Button
        onClick={toggleTheme}
        variant="link"
        className="hover:no-underline"
      >
        <i className="ri-moon-line" />
      </Button>
    </div>
  )
}

export default ThemeToggle
