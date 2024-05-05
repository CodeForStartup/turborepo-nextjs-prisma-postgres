"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ChevronDown, ChevronUp } from "lucide-react"
import {
  buttonVariants,
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Typography,
} from "ui"

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
  const [open, setOpen] = React.useState(false)

  const isActive =
    currentPathname === "/" ? link === "/" : currentPathname.startsWith(link) && link !== "/"

  if (children) {
    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex">
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "flex-1 cursor-pointer items-center justify-between dark:text-white dark:hover:bg-muted dark:hover:text-white",
              {
                "bg-accent": isActive,
              }
            )}
          >
            <div className={"flex flex-row"}>
              {icons && (
                <div className="mr-2 flex h-6 w-4 items-center justify-center">{icons}</div>
              )}
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
              <button className="">
                {open ? (
                  <ChevronUp
                    strokeWidth={3}
                    size={18}
                  />
                ) : (
                  <ChevronDown
                    strokeWidth={3}
                    size={18}
                  />
                )}
              </button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          {children?.map((item, key) => (
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
          ))}
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
