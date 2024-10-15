"use client"

import React from "react"

import { MonitorDot, Moon, Sun } from "lucide-react"
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
        <MonitorDot />
      </Button>
      <Button
        onClick={toggleTheme}
        variant="link"
        className="hover:no-underline"
      >
        <Sun />
      </Button>
      <Button
        onClick={toggleTheme}
        variant="link"
        className="hover:no-underline"
      >
        <Moon />
      </Button>
    </div>
  )
}

export default ThemeToggle
