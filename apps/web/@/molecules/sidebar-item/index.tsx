"use client"
import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronUp, ChevronDown, StickyNote, TagIcon, Settings } from "lucide-react"

import Typography from "../typography"

type SidebarItemChildrenProps = {
  label: string
  link: string
  icons: React.ReactElement
}

export type SidebarItemProps = {
  label: string
  link: string
  icons: React.ReactElement
  children: Array<SidebarItemChildrenProps>
}

export default function SidebarItem({ label, link, icons, children }: SidebarItemProps) {
  const currentPathname = usePathname()
  const [open, setOpen] = React.useState(false);

  const isActive =
    currentPathname === "/" ? link === "/" : currentPathname.startsWith(link) && link !== "/"

  if (children) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex justify-between">
          <div
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

          </div>
          <CollapsibleTrigger asChild>
            <button className="IconButton">{open ? <ChevronUp strokeWidth={3} size={18} /> : <ChevronDown strokeWidth={3} size={18} />}</button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          {children?.map((item, key) => {
            return (
              <Link
                href={item?.link}
                key={key}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "ml-5 dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  {
                    "bg-accent": isActive,
                  }
                )}
              >
                <Typography
                  variant="span"
                  className={cn({
                    "font-bold": isActive,
                  })}
                >
                  {item?.label}
                </Typography>
              </Link>
            )
          })}
        </CollapsibleContent>
      </Collapsible>
    )
  }

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
