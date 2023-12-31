"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type SidebarItemProps = {
  label: string
  link: string
  icons: React.ReactElement
}

export default function SidebarItem({ label, link, icons }: SidebarItemProps) {
  const currentPathname = usePathname()

  const isActive =
    currentPathname === "/" ? link === "/" : currentPathname.startsWith(link) && link !== "/"

  return (
    <Link href={link}>
      <div
        className={cn(buttonVariants({ variant: "ghost" }), "my-[2px] w-full justify-start", {
          "bg-accent": isActive,
        })}
      >
        {icons && <div className="mr-2 flex h-6 w-4 items-center justify-center">{icons}</div>}
        <div className={cn(isActive ? "font-bold text-slate-900" : "text-slate-500")}>{label}</div>
      </div>
    </Link>
  )
}
