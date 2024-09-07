import Link from "next/link"

import { auth } from "configs/auth"
import { getTranslations } from "next-intl/server"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Typography,
} from "ui"

import { LogoutMenu } from "./LogoutMenu"

export async function UserNav() {
  const session = await auth()
  const t = await getTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name}
            />
            <AvatarFallback>{(session?.user?.name || "CO").slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <Link href={`/author/${session?.user?.id}`}>
            <div className="flex flex-col justify-center rounded-sm p-2 hover:bg-muted hover:underline">
              <Typography className="font-bold leading-none">@{session?.user?.name}</Typography>
              <Typography
                variant="span"
                className="text-xs leading-none text-muted-foreground"
              >
                {session?.user?.email}
              </Typography>
            </div>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/user/profile"
              className="flex flex-1"
            >
              {t("common.profile")}
            </Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/user/posts"
              className="flex flex-1"
            >
              {t("common.posts")}
            </Link>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/user/settings"
              className="flex flex-1"
            >
              {t("common.setting")}
            </Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/user/password"
              className="flex flex-1"
            >
              {t("common.password")}
            </Link>
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
