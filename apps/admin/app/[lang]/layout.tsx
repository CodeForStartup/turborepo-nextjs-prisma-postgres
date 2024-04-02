import "./globals.css"

import AuthProvider from "providers/authProvider"
import { ToastContainer } from "react-toastify"

import Nav from "@/molecules/nav"

import "react-toastify/dist/ReactToastify.css"
import "remixicon/fonts/remixicon.css"

import { NextIntlClientProvider, useMessages } from "next-intl"

import Footer from "@/molecules/footer"
import SidebarItem, { SidebarItemProps } from "@/molecules/sidebar-item"
import { Providers } from "@/providers"
import { User, HomeIcon, StickyNote, TagIcon, Settings } from "lucide-react"
export const metadata = {
  icons: {
    icon: "/assets/logo.png",
  },
}

const SIDE_BAR = [
  {
    label: "Dashboard",
    link: "/user/profile",
    icons: <HomeIcon size={16} />,
  },
  {
    label: "Posts",
    link: "/user/posts",
    icons: <StickyNote size={16} />,
  },
  {
    label: "Tags",
    link: "/user/tags",
    icons: <TagIcon size={16} />,
  },
  {
    label: "Users",
    link: "/user/user",
    icons: <User size={16} />,
  },
  {
    label: "Setting",
    icons: <Settings size={16} />,
    children: [
      {
        label: "Permission and Role",
        link: "/user/Permission",
      },
      {
        label: "Configuration",
        link: "/user/configuration",
      },
    ]
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
              <main className="flex min-h-[800px]">
                <div className="w-[250px] border-r p-1">
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
              <Footer />
            </Providers>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
