"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"

export type SidebarItemProps = {
  label: string
  link: string
  icons: React.ReactElement
}

export default function SidebarItem({ label, link, icons }: SidebarItemProps) {
  const isActive = link === window.location.pathname

  return (
    <Link href={link}>
      <div className="flex items-center">
        <div className="mr-2 flex h-6 w-4 items-center justify-center">{icons}</div>
        <div className={cn(isActive ? "font-bold text-slate-900" : "text-slate-500")}>{label}</div>
      </div>
    </Link>
  )
}
