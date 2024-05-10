"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants, cn, Typography } from "ui"

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
    <Link
      href={link}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "flex items-center justify-start dark:text-white dark:hover:bg-muted dark:hover:text-white",
        {
          "bg-accent": isActive,
        }
      )}
    >
      {icons && <div className="mr-2 flex h-6 w-4 items-center justify-center">{icons}</div>}
      <Typography
        variant="span"
        className={cn({
          "font-bold": isActive,
        })}
      >
        {label}
      </Typography>
    </Link>
  )
}
