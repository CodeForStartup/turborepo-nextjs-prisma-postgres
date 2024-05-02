import "./globals.css"

import AuthProvider from "providers/authProvider"
import { ToastContainer } from "react-toastify"

import Nav from "@/molecules/nav"

import "react-toastify/dist/ReactToastify.css"
import "remixicon/fonts/remixicon.css"

import { HomeIcon, Settings, StickyNote, TagIcon, User } from "lucide-react"
import { NextIntlClientProvider, useMessages } from "next-intl"

import SidebarItem, { SidebarItemProps } from "@/molecules/sidebar-item"
import { Providers } from "@/providers"

export const metadata = {
  icons: {
    icon: "/assets/logo.png",
  },
}

const SIDE_BAR = [
  {
    label: "Dashboard",
    link: "/",
    icons: <HomeIcon size={16} />,
  },
  {
    label: "Posts",
    link: "/posts",
    icons: <StickyNote size={16} />,
  },
  {
    label: "Tags",
    link: "/tags",
    icons: <TagIcon size={16} />,
  },
  {
    label: "Users",
    link: "/users",
    icons: <User size={16} />,
  },
  {
    label: "Setting",
    icons: <Settings size={16} />,
    type: "collapsible",
    children: [
      {
        label: "Permission and Role",
        link: "/settings/permission",
      },
      {
        label: "Configuration",
        link: "/settings/configuration",
      },
    ],
  },
] as Array<SidebarItemProps>

export default function RootLayout({
  params: { lang },
  children,
}: {
  params: { lang: string }
  children: React.ReactNode
}) {
  const messages = useMessages()

  return (
    <html
      lang={lang || "en"}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider
          locale={lang}
          messages={messages}
        >
          <AuthProvider>
            <Providers>
              <Nav />
              <main className="flex h-[calc(100vh-54px)]">
                <div className="w-[250px] border-r p-2">
                  {SIDE_BAR.map((item) => (
                    <SidebarItem
                      key={item.label}
                      {...item}
                    />
                  ))}
                </div>
                {children}
                <ToastContainer />
              </main>
            </Providers>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
